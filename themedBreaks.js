/**
 * usage:
 * 
 * 
 *  const sizeTheme = {
 *      small: {
 *         break: { max: 1024 },
 *         spacing: {
 *              extraSmall: 4,
 *              small: 8,
 *              medium: 16,
 *              large: 20,
 *              extraLarge: 24
 *         },
 *      },
 *      medium: {
 *          break: { min: 1023, max: 1366 },
 *          spacing: {
 *               extraSmall: 4,
 *               small: 8,
 *               medium: 12,
 *               large: 16,
 *               extraLarge: 20
 *           }
 *      },
 *      large: {
 *          break: { min: 1367 },
 *          spacing: {
 *              extraSmall: 4,
 *              small: 8,
 *              medium: 10,
 *              large: 12,
 *              extraLarge: 16
 *          },
 *          font: {
 *              small: .8125rem,
 *              normal: 1rem,
 *              strong: 1.25rem,
 *          }
 *      }
 *  };
 * 
 * const sizing = themedBreaks(sizeTheme);
 * 
 * const StyledDiv = styled.div`
 *      ${theme`
 *          padding: ${spacing.small}px ${spacing.medium}px;
 *          margin: ${spacing.large}px ${spacing.extraLarge}px;
 *          font-size: ${font.normal};
 *      `}
 * `;
 * 
 */

import mediaQueryMixin from './breakpoints';

// TODO: work on the naming

const weaveCSS = (cssStrings, cssArgs) => {
    const result = [cssStrings[0]];

    for (let i = 0, len = cssArgs.length; i < len; i += 1) {
        result.push(cssArgs[i], cssStrings[i + 1]);
    }

    return result.reduce((str, arg) => `${str}${arg}`, '');
};

// poc function for doing just one theme (sizing)
const buildBreakPointSizeMap = (theme, sizeArgs) => {
    const breakPoints = Object.keys(theme);

    return breakPoints.reduce((breakPointSizeMap, size) => {
        breakPointSizeMap[size] = sizeArgs.map((sizeArg) => spaceMap[size][sizeArg]);
        return breakPointSizeMap;
    }, {});
};

export default (cssFunc) => (theme) => (cssStrings, ...cssArgs) => {

    // right now theme is breakpoint function map
    const breakPointSizeMap = buildBreakPointSizeMap(theme, cssArgs);

    // const single

    return cssFunc`
        ${breakpoints.small`
            ${weaveCSS(cssStrings, breakPointSizeMap.small)}
        `}
    `;
};
