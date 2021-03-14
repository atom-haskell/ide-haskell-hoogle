"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    hoogleType: {
        order: 10,
        type: 'string',
        default: 'http://hoogle.haskell.org/',
        enum: [
            { value: '', description: 'Local hoogle. Will try to start Hoogle server from Path' },
            { value: 'http://hoogle.haskell.org/', description: 'Remote hoogle. Uses new http://hoogle.haskell.org/' },
            { value: 'https://haskell.org/hoogle/', description: 'Remote hoogle. Uses old https://haskell.org/hoogle/' },
        ],
    },
    hooglePath: {
        type: 'string',
        default: 'hoogle',
        description: 'Path to hoogle executable',
        order: 20,
    },
    webZoomFactor: {
        type: 'integer',
        description: 'Zoom factor for web view, in %',
        default: 100,
        minimum: 50,
        maximum: 300,
        order: 30,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLE1BQU0sR0FBRztJQUNwQixVQUFVLEVBQUU7UUFDVixLQUFLLEVBQUUsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxJQUFJLEVBQUU7WUFDSixFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLHlEQUF5RCxFQUFFO1lBQ3JGLEVBQUUsS0FBSyxFQUFFLDRCQUE0QixFQUFFLFdBQVcsRUFBRSxvREFBb0QsRUFBRTtZQUMxRyxFQUFFLEtBQUssRUFBRSw2QkFBNkIsRUFBRSxXQUFXLEVBQUUscURBQXFELEVBQUU7U0FDN0c7S0FDRjtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7UUFDakIsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFNBQVM7UUFDZixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLE9BQU8sRUFBRSxHQUFHO1FBQ1osT0FBTyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsR0FBRztRQUNaLEtBQUssRUFBRSxFQUFFO0tBQ1Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgaG9vZ2xlVHlwZToge1xuICAgIG9yZGVyOiAxMCxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnaHR0cDovL2hvb2dsZS5oYXNrZWxsLm9yZy8nLFxuICAgIGVudW06IFtcbiAgICAgIHsgdmFsdWU6ICcnLCBkZXNjcmlwdGlvbjogJ0xvY2FsIGhvb2dsZS4gV2lsbCB0cnkgdG8gc3RhcnQgSG9vZ2xlIHNlcnZlciBmcm9tIFBhdGgnIH0sXG4gICAgICB7IHZhbHVlOiAnaHR0cDovL2hvb2dsZS5oYXNrZWxsLm9yZy8nLCBkZXNjcmlwdGlvbjogJ1JlbW90ZSBob29nbGUuIFVzZXMgbmV3IGh0dHA6Ly9ob29nbGUuaGFza2VsbC5vcmcvJyB9LFxuICAgICAgeyB2YWx1ZTogJ2h0dHBzOi8vaGFza2VsbC5vcmcvaG9vZ2xlLycsIGRlc2NyaXB0aW9uOiAnUmVtb3RlIGhvb2dsZS4gVXNlcyBvbGQgaHR0cHM6Ly9oYXNrZWxsLm9yZy9ob29nbGUvJyB9LFxuICAgIF0sXG4gIH0sXG4gIGhvb2dsZVBhdGg6IHtcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBkZWZhdWx0OiAnaG9vZ2xlJyxcbiAgICBkZXNjcmlwdGlvbjogJ1BhdGggdG8gaG9vZ2xlIGV4ZWN1dGFibGUnLFxuICAgIG9yZGVyOiAyMCxcbiAgfSxcbiAgd2ViWm9vbUZhY3Rvcjoge1xuICAgIHR5cGU6ICdpbnRlZ2VyJyxcbiAgICBkZXNjcmlwdGlvbjogJ1pvb20gZmFjdG9yIGZvciB3ZWIgdmlldywgaW4gJScsXG4gICAgZGVmYXVsdDogMTAwLFxuICAgIG1pbmltdW06IDUwLFxuICAgIG1heGltdW06IDMwMCxcbiAgICBvcmRlcjogMzAsXG4gIH0sXG59XG4iXX0=