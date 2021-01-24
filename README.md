# react-shared-compute

## aim
Same compute between multiple components should be executed only once. 
> Note: Same compute means both function and args are equal.

Combined with react hooks, we can get features below:
 + case 1: when multiple referenced, only compute once. (memo)
 + case 2: no reference, no compute. (lazy)
 + case 3: when function arguments(compute deps) change, go to case 1 or case 2. (reactive)

A reactive lazy memo compute, cool!

## demo