# [My Mermaid Practice](../README.md#mermaid)

Practice codes focused on *Mermaid* `flowchart` syntax, mainly node styling, layout optimization and swimlane structures.


### \<List>

- [Topic 3: Swimlane vs Traditional Flowchart](/Mermaid/03_SwimlaneVsFlowchart.md)
- [Topic 2: Hybrid Horizontal/Vertical Layout](/Mermaid/02_HybridLayout.md)
- [Topic 1: Node Text Styling](/Mermaid/01_NodeTextStyling.md)


## [Topic 1: Node Text Styling](/Mermaid/01_NodeTextStyling.md)

- Inline `<span style='...'>` for one-off node emphasis
- `classDef` + `class` for reusable, consistent styling


## [Topic 2: Hybrid Horizontal/Vertical Layout](/Mermaid/02_HybridLayout.md)

- Keep the overall flow `LR` while branching complex condition areas vertically with `subgraph ... direction TB`


## [Topic 3: Swimlane vs Traditional Flowchart](/Mermaid/03_SwimlaneVsFlowchart.md)

- Same process modeled as (a) single flowchart + `subgraph` color grouping and (b) swimlane structure (`subgraph` per actor/system)
- Comparison table for selection criteria
