/*

ActionsTypes.js

In this file the different possible  Reduxactions are centralized.
There are three standard actions we use for a datatype (only "Raster"
(and "Intersection"?) for now (10-04-2017)) and they follow the
conventions/methodology as described below. The naturally ordered steps
in the lifecycle of a key-value pair in the stores' raster section:

1) ADD_RASTER_SYNC

  We initiate a new key-value pair in the stores' raster section. We'll use
  the UUID as key, the value will be an (immutable) object as contained
  in the Promise returned from our Lizard-Api-Client.

  This happens in-sync.

2) [ADD_RASTER] ... not a real Redux action; only used internally in
  RasterActions.js! Since it invokes a-sync code execution, it should never
  be dispatched to the reducers

  The resolving of the Promise as returned from the Lizard-Api-Client.
  The Promise should resolve with an immutable RasterStore object. In case
  an error occurrs

  This happens a-sync.

3) RECEIVE_RASTER

  The handling of a readily resolved Promise: we write the received data
  to the stores' raster section.

  This happens in-sync.

4) REMOVE_RASTER

  The removing of both key and value from the stores' raster section.

  This happens in-sync.

******************************************************************************/

export const FETCH_RASTER = 'FETCH_RASTER';
export const RECEIVE_RASTER = 'RECEIVE_RASTER';
export const REMOVE_RASTER = 'REMOVE_RASTER';
