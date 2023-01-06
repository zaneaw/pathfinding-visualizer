
Clear walls
Clear previous results (but not walls)
Add weights

Add slider for how fast animations should run

More pathfinding algorithms
Build walls (button)
Style buttons and stuff
Animate boxes changing to purple and yellow


randomize start and end -> resets walls but not results -> should reset results but not walls. Would removing start and end points from state be plausible?
** create new func -> getNewGridWithWallToggled -> setNodes and map over nodes to create new nodes to push into state while changing the start and end points.

reset walls, results, and grid works.