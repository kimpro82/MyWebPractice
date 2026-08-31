# [My Mermaid Practice](../README.md#mermaid)

Practice codes focused on *Mermaid* `flowchart` syntax, mainly node styling, layout optimization and swimlane structures.

Each mermaid diagram below is also saved as an independent `.mmd` file under [`/diagrams`](/Mermaid/diagrams/), so it can be reused or rendered by external tools directly.


### \<List>

- [Topic 1: Node Text Styling](#topic-1-노드-텍스트-크기색상-커스터마이징)
- [Topic 2: Hybrid Horizontal/Vertical Layout](#topic-2-하이브리드-가로세로-플로우차트로-공간-최적화)
- [Topic 3: Swimlane vs Traditional Flowchart](#topic-3-스윔레인-vs-전통적-플로우차트-구조-비교)

---

## Topic 1. 노드 텍스트 크기/색상 커스터마이징

### 목표
중요한 의사결정 노드나 예외 처리 노드의 폰트 크기, 색상, 굵기를 조절하여 가독성을 확보한다.

### 연습 내용
1. 노드 텍스트 안에 인라인 HTML 태그(`<span style='...'>`)를 사용해 개별 스타일 적용
2. `classDef` 로 재사용 가능한 공통 스타일을 정의하고 `class` 로 적용

#### 1) 인라인 `<span style='...'>` 스타일 적용
([`diagrams/01a_InlineSpanStyle.mmd`](/Mermaid/diagrams/01a_InlineSpanStyle.mmd))

```mermaid
flowchart TD
    A[시작] --> B{재고 확인}
    B -->|재고 있음| C[출고 처리]
    B -->|재고 없음| D["<span style='color:#d00000; font-size:20px; font-weight:bold;'>⚠ 재고 부족 경고</span>"]
    D --> E["<span style='color:#0d47a1; font-size:14px;'>발주 담당자에게 알림 발송</span>"]
    C --> F[완료]
    E --> F
```

- 노드 `D`, `E`는 개별 노드에만 적용되는 인라인 스타일 예시이다.
- 폰트 크기(`font-size`), 색상(`color`), 굵기(`font-weight`)를 노드마다 다르게 지정할 수 있다.
- 단점: 노드가 많아질수록 스타일 코드가 중복되어 유지보수가 어려워진다. → `classDef` 로 해결.

#### 2) `classDef` 로 재사용 스타일 정의
([`diagrams/01b_ClassDefStyle.mmd`](/Mermaid/diagrams/01b_ClassDefStyle.mmd))

```mermaid
flowchart TD
    A[시작] --> B{결제 승인 여부}
    B -->|승인| C[주문 확정]
    B -->|거절| D[결제 실패 처리]
    D --> E[재시도 안내]
    C --> F{배송 가능 지역?}
    F -->|가능| G[배송 시작]
    F -->|불가| H[환불 처리]
    G --> I[완료]
    H --> I

    class D,H danger
    class F,B decision
    class I success

    classDef danger fill:#ffe0e0,stroke:#d00000,stroke-width:2px,color:#d00000,font-weight:bold;
    classDef decision fill:#fff8dc,stroke:#e0a800,stroke-width:1.5px,color:#7a5c00;
    classDef success fill:#e0ffe0,stroke:#2e7d32,stroke-width:2px,color:#1b5e20,font-weight:bold;
```

- `classDef` 는 색상(`fill`, `stroke`, `color`), 굵기(`font-weight`), 테두리 두께(`stroke-width`) 등을 한 번에 정의한다.
- `class 노드ID,노드ID class명` 구문으로 여러 노드에 동일 스타일을 일괄 적용할 수 있어 유지보수가 쉽다.

### 정리
| 방식 | 장점 | 단점 |
|---|---|---|
| 인라인 `<span style>` | 노드 하나만 예외적으로 강조할 때 빠름 | 반복되면 코드가 지저분해짐 |
| `classDef` + `class` | 일관된 스타일을 재사용, 유지보수 용이 | 노드별 미세 조정에는 부적합 |

→ **원칙**: 전역/그룹 스타일은 `classDef`, 특정 노드 1회성 강조는 인라인 스타일을 혼용하는 것이 실무적으로 효율적이다.

---

## Topic 2. 하이브리드 가로/세로 플로우차트로 공간 최적화

### 목표
전체 흐름은 가로(`LR`)로 유지하면서, 조건 분기가 복잡한 구간만 `subgraph` 내부에서 `direction TB` 를 지정해 세로로 전개함으로써 화면 낭비를 줄인다.

### 연습 내용
- `subgraph` 별 `direction TB` / `direction LR` 선언을 조합한 하이브리드 레이아웃 구성

#### 1) 전체를 `LR`로만 그렸을 때 (비교용, 가로로 계속 늘어남)
([`diagrams/02a_FullLR.mmd`](/Mermaid/diagrams/02a_FullLR.mmd))

```mermaid
flowchart LR
    A[요청 접수] --> B{입력값 검증}
    B -->|형식 오류| C[오류 코드 400 반환]
    B -->|필수값 누락| D[오류 코드 422 반환]
    B -->|통과| E{권한 확인}
    E -->|권한 없음| F[오류 코드 403 반환]
    E -->|권한 있음| G[비즈니스 로직 수행]
    G --> H[응답 생성]
```

- 조건 분기(`B`, `E`)에서 나오는 오류 노드들이 모두 가로로 나열되어 화면 폭이 지나치게 넓어진다.

#### 2) 하이브리드 레이아웃: 전체 `LR` + 분기 구간만 내부 `TB`
([`diagrams/02b_HybridLR_TB.mmd`](/Mermaid/diagrams/02b_HybridLR_TB.mmd))

```mermaid
flowchart LR
    A[요청 접수] --> B{입력값 검증}

    subgraph VALIDATION["검증 실패 처리"]
        direction TB
        C[오류 코드 400 반환]
        D[오류 코드 422 반환]
    end

    B -->|형식 오류| C
    B -->|필수값 누락| D
    B -->|통과| E{권한 확인}

    subgraph AUTH["권한 실패 처리"]
        direction TB
        F[오류 코드 403 반환]
    end

    E -->|권한 없음| F
    E -->|권한 있음| G[비즈니스 로직 수행]
    G --> H[응답 생성]
```

- 전체 흐름(`A → B → E → G → H`)은 그대로 `LR`을 유지해 한눈에 프로세스 순서를 파악할 수 있다.
- 오류 처리처럼 지엽적인 분기는 `subgraph` 안에서 `direction TB` 로 세로 배치하여 가로 폭 낭비를 줄인다.
- 상위 플로우차트의 기본 `direction`(`LR`)과 무관하게 각 `subgraph` 내부에서 독립적으로 `direction` 을 지정할 수 있다.

### 정리
- `flowchart` 전체 방향과 `subgraph` 내부 방향은 서로 다르게 지정 가능하다.
- 분기가 많은 영역(에러 처리, 예외 케이스 등)을 별도 `subgraph`로 묶고 `direction TB`를 주면, 전체 폭은 좁게 유지하면서 세부 내용은 세로로 확장할 수 있다.
- 문서/다이어그램이 가로로 너무 길어질 때 우선적으로 적용해볼 수 있는 레이아웃 최적화 기법이다.

---

## Topic 3. 스윔레인 vs 전통적 플로우차트 구조 비교

### 목표
시스템별 책임 영역을 명확히 구분하는 스윔레인(Swimlane) 구조와, 일반적인 단일 플로우차트(+ `subgraph`) 구조의 가독성 및 레이아웃 안정성을 비교하여 상황별 적합한 선택 기준을 세운다.

### 연습 내용
- 동일한 프로세스("온라인 주문 처리")를 두 가지 방식으로 표현하고 비교

#### 1) 단일 플로우차트 + `subgraph` (전통적 방식)
([`diagrams/03a_SingleFlowchartSubgraph.mmd`](/Mermaid/diagrams/03a_SingleFlowchartSubgraph.mmd))

```mermaid
flowchart TD
    A[고객: 주문 요청] --> B[쇼핑몰 서버: 재고 확인]
    B --> C{재고 있음?}
    C -->|아니오| D[고객: 품절 안내]
    C -->|예| E[결제 서버: 결제 승인 요청]
    E --> F{결제 성공?}
    F -->|아니오| G[고객: 결제 실패 안내]
    F -->|예| H[물류 센터: 출고 지시]
    H --> I[물류 센터: 배송 시작]
    I --> J[고객: 배송 완료 알림]

    classDef customer fill:#e3f2fd,stroke:#1565c0;
    classDef mall fill:#fff3e0,stroke:#ef6c00;
    classDef payment fill:#f3e5f5,stroke:#6a1b9a;
    classDef logistics fill:#e8f5e9,stroke:#2e7d32;

    class A,D,G,J customer;
    class B,C mall;
    class E,F payment;
    class H,I logistics;
```

- 담당 시스템(고객/쇼핑몰/결제/물류)을 노드 텍스트와 `classDef` 색상으로만 구분한다.
- 노드 수가 늘어나면 "어느 시스템이 어떤 단계를 담당하는지"를 색상 범례에 의존해서 파악해야 하므로, 프로세스가 길어질수록 추적이 번거로워진다.

#### 2) 스윔레인 구조 (시스템별 `subgraph` 분리)
([`diagrams/03b_SwimlaneStructure.mmd`](/Mermaid/diagrams/03b_SwimlaneStructure.mmd))

```mermaid
flowchart TD
    subgraph CUST["👤 고객"]
        direction TB
        A[주문 요청]
        D[품절 안내 수신]
        G[결제 실패 안내 수신]
        J[배송 완료 알림 수신]
    end

    subgraph MALL["🏬 쇼핑몰 서버"]
        direction TB
        B[재고 확인]
        C{재고 있음?}
    end

    subgraph PAY["💳 결제 서버"]
        direction TB
        E[결제 승인 요청]
        F{결제 성공?}
    end

    subgraph LOGI["🚚 물류 센터"]
        direction TB
        H[출고 지시]
        I[배송 시작]
    end

    A --> B --> C
    C -->|아니오| D
    C -->|예| E --> F
    F -->|아니오| G
    F -->|예| H --> I --> J
```

- 각 `subgraph`가 하나의 "레인(lane)"이 되어, 어떤 시스템이 어떤 노드를 담당하는지 위치 자체로 즉시 드러난다.
- 시스템 간 경계를 넘나드는 화살표(`C -->|예| E`, `F -->|예| H` 등)가 곧 "시스템 간 인터페이스/책임 이관 지점"을 의미하게 되어, 통합 지점 파악이 쉽다.

#### 3) 비교 결과

| 항목 | 단일 플로우차트 + `subgraph`(색상 구분) | 스윔레인 구조 |
|---|---|---|
| 담당 주체 파악 | 범례(색상)를 따로 확인해야 함 | 레인 위치만으로 즉시 파악 |
| 시스템 간 경계(인터페이스) 식별 | 명시적이지 않음 | 레인을 가로지르는 화살표로 명확히 드러남 |
| 노드 수 증가 시 안정성 | 노드가 늘어도 레이아웃 자체는 단순 | 레인별 노드 수 불균형 시 레인 폭/높이가 불균등해질 수 있음 |
| 작성 난이도 | 낮음 (`classDef` 몇 개만 정의) | 다소 높음 (`subgraph`별 방향/그룹 관리 필요) |
| 적합한 상황 | 단일 시스템 내부 로직, 담당 주체 구분이 덜 중요한 경우 | 여러 팀/시스템이 협업하는 프로세스, 책임 소재·핸드오프 지점이 중요한 경우 |

### 선택 기준 정리
1. **프로세스가 하나의 시스템/팀 내부에서 완결**되면 → 단일 플로우차트(+ `classDef` 강조)로 충분하다.
2. **여러 시스템·팀이 순차적으로 관여하고 책임 이관 지점(핸드오프)을 명확히 보여줘야** 하면 → 스윔레인 구조가 적합하다.
3. 다만 스윔레인은 각 레인의 노드 수 차이가 크면 레이아웃이 불안정(레인 폭 불균형, 화살표 교차)해질 수 있으므로, 레인별 노드 수를 가능한 균형 있게 설계하는 것이 좋다.
