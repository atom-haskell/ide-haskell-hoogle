"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFhLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLFVBQVUsRUFBRTtRQUNWLEtBQUssRUFBRSxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsNEJBQTRCO1FBQ3JDLElBQUksRUFBRTtZQUNKLEVBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUseURBQXlELEVBQUM7WUFDbkYsRUFBQyxLQUFLLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLG9EQUFvRCxFQUFDO1lBQ3hHLEVBQUMsS0FBSyxFQUFFLDZCQUE2QixFQUFFLFdBQVcsRUFBRSxxREFBcUQsRUFBQztTQUMzRztLQUNGO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsUUFBUTtRQUNqQixXQUFXLEVBQUUsMkJBQTJCO1FBQ3hDLEtBQUssRUFBRSxFQUFFO0tBQ1Y7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsU0FBUztRQUNmLFdBQVcsRUFBRSxnQ0FBZ0M7UUFDN0MsT0FBTyxFQUFFLEdBQUc7UUFDWixPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxHQUFHO1FBQ1osS0FBSyxFQUFFLEVBQUU7S0FDVjtDQUNGLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgY29uZmlnID0ge1xuICBob29nbGVUeXBlOiB7XG4gICAgb3JkZXI6IDEwLFxuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdodHRwOi8vaG9vZ2xlLmhhc2tlbGwub3JnLycsXG4gICAgZW51bTogW1xuICAgICAge3ZhbHVlOiAnJywgZGVzY3JpcHRpb246ICdMb2NhbCBob29nbGUuIFdpbGwgdHJ5IHRvIHN0YXJ0IEhvb2dsZSBzZXJ2ZXIgZnJvbSBQYXRoJ30sXG4gICAgICB7dmFsdWU6ICdodHRwOi8vaG9vZ2xlLmhhc2tlbGwub3JnLycsIGRlc2NyaXB0aW9uOiAnUmVtb3RlIGhvb2dsZS4gVXNlcyBuZXcgaHR0cDovL2hvb2dsZS5oYXNrZWxsLm9yZy8nfSxcbiAgICAgIHt2YWx1ZTogJ2h0dHBzOi8vaGFza2VsbC5vcmcvaG9vZ2xlLycsIGRlc2NyaXB0aW9uOiAnUmVtb3RlIGhvb2dsZS4gVXNlcyBvbGQgaHR0cHM6Ly9oYXNrZWxsLm9yZy9ob29nbGUvJ30sXG4gICAgXSxcbiAgfSxcbiAgaG9vZ2xlUGF0aDoge1xuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGRlZmF1bHQ6ICdob29nbGUnLFxuICAgIGRlc2NyaXB0aW9uOiAnUGF0aCB0byBob29nbGUgZXhlY3V0YWJsZScsXG4gICAgb3JkZXI6IDIwLFxuICB9LFxuICB3ZWJab29tRmFjdG9yOiB7XG4gICAgdHlwZTogJ2ludGVnZXInLFxuICAgIGRlc2NyaXB0aW9uOiAnWm9vbSBmYWN0b3IgZm9yIHdlYiB2aWV3LCBpbiAlJyxcbiAgICBkZWZhdWx0OiAxMDAsXG4gICAgbWluaW11bTogNTAsXG4gICAgbWF4aW11bTogMzAwLFxuICAgIG9yZGVyOiAzMCxcbiAgfSxcbn1cbiJdfQ==