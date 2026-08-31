# [My Mermaid Practice](../README.md#mermaid)

Practice codes focused on *Mermaid* `flowchart` syntax, mainly node styling, layout optimization and swimlane structures.

Each mermaid diagram below is also saved as an independent `.mmd` file under [`/diagrams`](/Mermaid/diagrams/), so it can be reused or rendered by external tools directly.


### \<List>

- [Advanced Flowchart Practice (2026.08.31)](#advanced-flowchart-practice-20260831)


---

## Advanced Flowchart Practice (2026.08.31)

Core `flowchart` practice covering node styling, hybrid layout control, and responsibility-oriented diagram structures.

### Topic 1. Node Text Size and Color Customization

#### Goal
Improve readability by controlling font size, color, and weight for important decision and exception-handling nodes.

#### Practice Content
1. Apply one-off styles with inline HTML (`<span style='...'>`) inside node text.
2. Define reusable shared styles with `classDef` and apply them through `class`.

##### 1) Inline `<span style='...'>` Styling
([`diagrams/01a_InlineSpanStyle.mmd`](/Mermaid/diagrams/01a_InlineSpanStyle.mmd))

```mermaid
flowchart TD
    A[야식 주문] --> B{냉장고에 피자 있음?}
    B -->|있음| C[전자레인지 3분 가동]
    B -->|없음| D["<span style='font-size:20px; font-weight:bold;'>⚠ 피자 멸종 위기</span>"]
    D --> E["<span style='font-size:22px; font-weight:bold;'>배달 앱에 구조 요청!</span>"]
    C --> F[행복한 야식 완료]
    E --> F

    class D alert
    class E rescue

    classDef alert fill:#ffe0e0,stroke:#d00000,stroke-width:2px,color:#d00000;
    classDef rescue fill:#0056b3,stroke:#003f7f,stroke-width:2px,color:#ffffff;
```

- Nodes `D` and `E` use inline styling for their individual text size and weight.
- Node colors use `fill`, `stroke`, and `color` from `classDef`. The `rescue` class uses a blue background with white text for strong contrast.
- Inline HTML `color` may be ignored depending on Mermaid security settings or the renderer, so use `classDef` for node colors.

##### 2) Reusable Styles with `classDef`
([`diagrams/01b_ClassDefStyle.mmd`](/Mermaid/diagrams/01b_ClassDefStyle.mmd))

```mermaid
flowchart TD
    A[점심 메뉴 고르기] --> B{통장 잔고 충분?}
    B -->|충분| C[치킨 주문]
    B -->|부족| D[물 마시며 반성]
    D --> E[다음 월급날 알림 설정]
    C --> F{배달 가능 지역?}
    F -->|가능| G[치킨 도착 대기]
    F -->|불가| H[슬픈 계란후라이]
    G --> I[포만감 완료]
    H --> I

    class D,H danger
    class F,B decision
    class I success

    classDef danger fill:#ffe0e0,stroke:#d00000,stroke-width:2px,color:#d00000,font-weight:bold;
    classDef decision fill:#fff8dc,stroke:#e0a800,stroke-width:1.5px,color:#7a5c00;
    classDef success fill:#e0ffe0,stroke:#2e7d32,stroke-width:2px,color:#1b5e20,font-weight:bold;
```

- `classDef` defines colors (`fill`, `stroke`, `color`), weight (`font-weight`), border width (`stroke-width`), and more in one place.
- The `class nodeId,nodeId className` syntax applies the same style to multiple nodes, which makes maintenance easier.

#### Summary
| Approach | Strength | Limitation |
|---|---|---|
| Inline `<span style>` | Quick for an exceptional emphasis on one node | Repetition makes the code cluttered |
| `classDef` + `class` | Reuses consistent styles and is easy to maintain | Less suited to per-node fine tuning |

**Guideline:** Use `classDef` for shared or group styles and inline styling for one-off emphasis on individual nodes.

---

### Topic 2. Space Optimization with Hybrid Horizontal and Vertical Flowcharts

#### Goal
Reduce wasted space by keeping the overall flow horizontal (`LR`) and arranging only complex conditional branches vertically with `direction TB` inside a `subgraph`.

#### Practice Content
- Build hybrid layouts by combining `direction TB` and `direction LR` declarations for individual `subgraph` sections.

##### 1) Entire Diagram in `LR` (Comparison: It Continues to Expand Horizontally)
([`diagrams/02a_FullLR.mmd`](/Mermaid/diagrams/02a_FullLR.mmd))

```mermaid
flowchart LR
    A[회의 초대 수신] --> B{참석 사유 확인}
    B -->|내 업무 아님| C[달력에 회의 숨기기]
    B -->|제목이 모호함| D["일단 거절" 클릭]
    B -->|참석 필요| E{카메라 켤 용기?}
    E -->|없음| F[네트워크 문제인 척하기]
    E -->|있음| G[고개 끄덕이기 연습]
    G --> H[회의 생존]
```

- The avoidance nodes branching from conditions `B` and `E` all appear horizontally, making the diagram unnecessarily wide.

##### 2) Hybrid Layout: Overall `LR` with Branches in `TB`
([`diagrams/02b_HybridLR_TB.mmd`](/Mermaid/diagrams/02b_HybridLR_TB.mmd))

```mermaid
flowchart LR
    A[회의 초대 수신] --> B{참석 사유 확인}

    subgraph VALIDATION["참석 회피 절차"]
        direction TB
        C[달력에 회의 숨기기]
        D["일단 거절" 클릭]
    end

    B -->|내 업무 아님| C
    B -->|제목이 모호함| D
    B -->|참석 필요| E{카메라 켤 용기?}

    subgraph AUTH["카메라 회피 절차"]
        direction TB
        F[네트워크 문제인 척하기]
    end

    E -->|없음| F
    E -->|있음| G[고개 끄덕이기 연습]
    G --> H[회의 생존]
```

- The main flow (`A → B → E → G → H`) remains `LR`, so the process order is easy to scan.
- Local branches, such as avoidance procedures, are arranged vertically with `direction TB` inside a `subgraph` to reduce horizontal sprawl.
- Each `subgraph` can declare its own `direction` independently of the parent flowchart direction (`LR`).

#### Summary
- The overall `flowchart` direction and a `subgraph` direction can be different.
- Group branch-heavy areas, such as error handling and exceptions, in a separate `subgraph` with `direction TB` to keep the diagram narrow while expanding details vertically.
- This is a useful layout optimization when a document or diagram becomes too wide.

---

### Topic 3. Structural Comparison: Swimlanes vs Traditional Flowcharts

#### Goal
Compare the readability and layout stability of swimlanes, which clearly separate ownership by system, with a standard single flowchart using `subgraph`, and establish selection criteria for each context.

#### Practice Content
- Model the same process in two forms and compare them.

<table>
  <tr>
    <td width="50%" valign="top">
      <strong>1) Single Flowchart with <code>subgraph</code> (Traditional Approach)</strong><br>
      (<a href="/Mermaid/diagrams/03a_SingleFlowchartSubgraph.mmd"><code>diagrams/03a_SingleFlowchartSubgraph.mmd</code></a>)

```mermaid
flowchart TD
    A[직원: 커피 주문] --> B[사무실: 원두 재고 확인]
    B --> C{원두 있음?}
    C -->|아니오| D[직원: 영혼 없는 물 마시기]
    C -->|예| E[커피 머신: 추출 시작]
    E --> F{컵을 놓았나?}
    F -->|아니오| G[직원: 테이블 청소 당첨]
    F -->|예| H[바리스타: 카페인 투입]
    H --> I[바리스타: 향기 퍼뜨리기]
    I --> J[직원: 인간성 회복 알림]

    classDef customer fill:#e3f2fd,stroke:#1565c0;
    classDef mall fill:#fff3e0,stroke:#ef6c00;
    classDef payment fill:#f3e5f5,stroke:#6a1b9a;
    classDef logistics fill:#e8f5e9,stroke:#2e7d32;

    class A,D,G,J customer;
    class B,C mall;
    class E,F payment;
    class H,I logistics;
```

The responsible party is distinguished only through node text and <code>classDef</code> colors. As the number of nodes grows, readers must rely on the color legend to identify responsibility, making longer processes harder to trace.
    </td>
    <td width="50%" valign="top">
      <strong>2) Swimlane Structure (One <code>subgraph</code> per System)</strong><br>
      (<a href="/Mermaid/diagrams/03b_SwimlaneStructure.mmd"><code>diagrams/03b_SwimlaneStructure.mmd</code></a>)

```mermaid
flowchart TD
    subgraph CUST["👤 직원"]
        direction TB
        A[커피 주문]
        D[영혼 없는 물 마시기]
        G[테이블 청소 당첨]
        J[인간성 회복 알림]
    end

    subgraph MALL["🏢 사무실"]
        direction TB
        B[원두 재고 확인]
        C{원두 있음?}
    end

    subgraph PAY["☕ 커피 머신"]
        direction TB
        E[추출 시작]
        F{컵을 놓았나?}
    end

    subgraph LOGI["🧑‍🍳 바리스타"]
        direction TB
        H[카페인 투입]
        I[향기 퍼뜨리기]
    end

    A --> B --> C
    C -->|아니오| D
    C -->|예| E --> F
    F -->|아니오| G
    F -->|예| H --> I --> J
```

Each <code>subgraph</code> becomes a lane, making node ownership immediately visible through position. Arrows crossing system boundaries show system interfaces and responsibility handoff points, making integrations easier to identify.
    </td>
  </tr>
</table>

##### 3) Comparison

| Criterion | Single Flowchart + `subgraph` (Color Grouping) | Swimlane Structure |
|---|---|---|
| Identifying ownership | Requires checking a separate color legend | Immediately visible from lane position |
| Identifying system boundaries and interfaces | Not explicit | Clear from arrows crossing lanes |
| Stability as node count grows | The layout remains simple | Uneven node counts can create uneven lane dimensions |
| Authoring effort | Low: only a few `classDef` declarations | Higher: each `subgraph` needs direction and group management |
| Best fit | Internal logic in one system where ownership is less important | Multi-team or multi-system processes where ownership and handoffs matter |

#### Selection Guidelines
1. When a process is contained within one system or team, a single flowchart with `classDef` emphasis is sufficient.
2. When several systems or teams participate sequentially and responsibility handoffs must be clear, use a swimlane structure.
3. Swimlane layouts can become unstable when lane node counts differ greatly, causing uneven dimensions and arrow crossings. Keep lane content as balanced as practical.
