// javascript-astar
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a binary heap.
var astar = {
	init: function(grid) {
		for (var x = 0, xl = grid[LENGTH]; x < xl; x++) {
			for (var y = 0, yl = grid[x][LENGTH]; y < yl; y++) {
				var node = grid[x][y];
				node.f = 0;
				node.g = 0;
				node.h = 0;
				node[COST] = node[SPEED];
				node.visited = false;
				node.closed = false;
				node.parent = NULL;
			}
		}
	},
	heap: function() {
		return new BinaryHeap(function(node) {
			return node.f;
		});
	},
	search: function(grid, start, end) {
		astar.init(grid);
		heuristic = astar.manhattan;

		var openHeap = astar.heap();

		openHeap[PUSH](start);

		while (openHeap.size() > 0) {

			// Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
			var currentNode = openHeap.pop();

			// End case -- result has been found, return the traced path.
			if (currentNode === end) {
				var curr = currentNode;
				var ret = [];
				while (curr.parent) {
					ret[PUSH](curr);
					curr = curr.parent;
				}
				return ret.reverse();
			}

			// Normal case -- move currentNode from open to closed, process each of its neighbors.
			currentNode.closed = true;

			// Find all neighbors for the current node.
			var neighbors = astar.neighbors(grid, currentNode);

			for (var i = 0, il = neighbors[LENGTH]; i < il; i++) {
				var neighbor = neighbors[i];

				if (neighbor.closed || neighbor[SPEED] === 0) {
					// Not a valid node to process, skip to next neighbor.
					continue;
				}

				// The g score is the shortest distance from start to current node.
				// We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
				var gScore = currentNode.g + neighbor[COST];
				var beenVisited = neighbor.visited;

				if (!beenVisited || gScore < neighbor.g) {

					// Found an optimal (so far) path to this node.  Take score for node to see how good it is.
					neighbor.visited = true;
					neighbor.parent = currentNode;
					neighbor.h = neighbor.h || heuristic(neighbor.x, neighbor.y, end.x, end.y);
					neighbor.g = gScore;
					neighbor.f = neighbor.g + neighbor.h;

					if (!beenVisited) {
						// Pushing to heap will put it in proper place based on the 'f' value.
						openHeap[PUSH](neighbor);
					} else {
						// Already seen the node, but since it has been rescored we need to reorder it in the heap
						openHeap.rescoreElement(neighbor);
					}
				}
			}
		}

		// No result was found - empty array signifies failure to find path.
		return [];
	},
	manhattan: function(pos0X, pos0Y, pos1X, pos1Y) {
		// See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
		var d1 = WINDOW[MATH].abs(pos1X - pos0X);
		var d2 = WINDOW[MATH].abs(pos1Y - pos0Y);
		return d1 + d2;
	},
	neighbors: function(grid, node) {
		var ret = [];
		var x = node.x;
		var y = node.y;

		// West
		if (grid[x - 1] && grid[x - 1][y]) {
			ret[PUSH](grid[x - 1][y]);
		}

		// East
		if (grid[x + 1] && grid[x + 1][y]) {
			ret[PUSH](grid[x + 1][y]);
		}

		// South
		if (grid[x] && grid[x][y - 1]) {
			ret[PUSH](grid[x][y - 1]);
		}

		// North
		if (grid[x] && grid[x][y + 1]) {
			ret[PUSH](grid[x][y + 1]);
		}

		return ret;
	}
};

function BinaryHeap(scoreFunction) {
	this.content = [];
	this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
	push: function(element) {
		// Add the new element to the end of the array.
		this.content[PUSH](element);

		// Allow it to sink down.
		this.sinkDown(this.content[LENGTH] - 1);
	},
	pop: function() {
		// Store the first element so we can return it later.
		var result = this.content[0];
		// Get the element at the end of the array.
		var end = this.content.pop();
		// If there are any elements left, put the end element at the
		// start, and let it bubble up.
		if (this.content[LENGTH] > 0) {
			this.content[0] = end;
			this.bubbleUp(0);
		}
		return result;
	},
	size: function() {
		return this.content[LENGTH];
	},
	rescoreElement: function(node) {
		this.sinkDown(this.content.indexOf(node));
	},
	sinkDown: function(n) {
		// Fetch the element that has to be sunk.
		var element = this.content[n];

		// When at 0, an element can not sink any further.
		while (n > 0) {

			// Compute the parent element's index, and fetch it.
			var parentN = ((n + 1) >> 1) - 1,
				parent = this.content[parentN];
			// Swap the elements if the parent is greater.
			if (this.scoreFunction(element) < this.scoreFunction(parent)) {
				this.content[parentN] = element;
				this.content[n] = parent;
				// Update 'n' to continue at the new position.
				n = parentN;
			}

			// Found a parent that is less, no need to sink any further.
			else {
				break;
			}
		}
	},
	bubbleUp: function(n) {
		// Look up the target element and its score.
		var length = this.content[LENGTH],
			element = this.content[n],
			elemScore = this.scoreFunction(element);

		while (true) {
			// Compute the indices of the child elements.
			var child2N = (n + 1) << 1,
				child1N = child2N - 1;
			// This is used to store the new position of the element,
			// if any.
			var swap = NULL;
			// If the first child exists (is inside the array)...
			if (child1N < length) {
				// Look it up and compute its score.
				var child1 = this.content[child1N],
					child1Score = this.scoreFunction(child1);

				// If the score is less than our element's, we need to swap.
				if (child1Score < elemScore) swap = child1N;
			}

			// Do the same checks for the other child.
			if (child2N < length) {
				var child2 = this.content[child2N],
					child2Score = this.scoreFunction(child2);
				if (child2Score < (swap === NULL ? elemScore : child1Score)) {
					swap = child2N;
				}
			}

			// If the element needs to be moved, swap it, and continue.
			if (swap !== NULL) {
				this.content[n] = this.content[swap];
				this.content[swap] = element;
				n = swap;
			}

			// Otherwise, we are done.
			else {
				break;
			}
		}
	}
};