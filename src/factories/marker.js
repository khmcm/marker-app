import getId from 'helpers/get-id'

/** @type {string} */
const DEFAULT_MARKER_COLOR = '#000000';

/** @type {string} */
const DEFAULT_MARKER_COLOR_FAMILY = '00a';

/** @type {string} */
const DEFAULT_MARKER_LABEL = 'black';

/** @type {boolean} */
const DEFAULT_MARKER_IS_FAVORITED = false;

/** @type {boolean} */
const DEFAULT_MARKER_IS_LOW_INK = false;

/** @type {boolean} */
const DEFAULT_MARKER_IS_OWNED = false;

/** @type {booelan} */
const DEFAULT_MARKER_IS_WISHLISTED = false;

/**
 * @param {Object} args
 * @param {string?} args.color The hex color code of the marker
 * @param {string?} args.colorFamily The color family of the marker
 * @param {boolean?} args.isFavorited Whether the marker is marked as a favorite or not
 * @param {boolean?} args.isLowInk Whether the marker is low on ink or not
 * @param {boolean?} args.isOwned Whether the marker is owned or not
 * @param {boolean?} args.isWishlisted Whether the marker is on the wish list or not
 * @param {string?} args.label The label of the marker
 * @returns {Marker}
 */
function createMarker(args) {

    /** @type {string} */
    const id = getId();

    /** @type {string} */
    let color;

    /** @type {string} */
    let colorFamily;

    /** @type {string} */
    let label;

    /** @type {boolean} */
    let isFavorited;

    /** @type {boolean} */
    let isLowInk;

    /** @type {boolean} */
    let isOwned;

    /** @type {boolean} */
    let isWishlisted;

    if(!args) { args = {
        color        : DEFAULT_MARKER_COLOR,
        colorFamily  : DEFAULT_MARKER_COLOR_FAMILY,
        label        : DEFAULT_MARKER_LABEL,
        isFavorited  : DEFAULT_MARKER_IS_FAVORITED,
        isLowInk     : DEFAULT_MARKER_IS_LOW_INK,
        isOwned      : DEFAULT_MARKER_IS_OWNED,
        isWishlisted : DEFAULT_MARKER_IS_WISHLISTED,
    }}

    if(args.color)        { color        = args.color          } else { color        = DEFAULT_MARKER_COLOR; }
    if(args.colorFamily)  { colorFamily  = args.colorFamily;   } else { colorFamily  = DEFAULT_MARKER_COLOR_FAMILY; }
    if(args.isFavorited)  { isFavorited  = args.isFavorited;   } else { isFavorited  = DEFAULT_MARKER_IS_FAVORITED; }
    if(args.isLowInk)     { isLowInk     = args.isLowInk;      } else { isLowInk     = DEFAULT_MARKER_IS_LOW_INK; }
    if(args.isOwned)      { isOwned      = args.isOwned;       } else { isOwned      = DEFAULT_MARKER_IS_OWNED; }
    if(args.isWishlisted) { isWishlisted = args.isWishlisted;  } else { isWishlisted = DEFAULT_MARKER_IS_WISHLISTED; }
    if(args.label)        { label        = args.label;         } else { label        = DEFAULT_MARKER_LABEL; }

    return {
        color:        color,
        colorFamily:  colorFamily,
        id:           id,
        isFavorited:  isFavorited,
        isLowInk:     isLowInk,
        isOwned:      isOwned,
        isWishlisted: isWishlisted,
        label:        label
    }
}

export default createMarker;