## 커밋 컨벤션

- [✨기능]: 기능과 관련된 작업을 수행했을 때 (JavaScript)
- [🎨UI]: 뷰와 관련된 작업을 수행했을 때 (HTML/CSS)
- [🛠️리팩토링]: 단순 수정 작업 이상으로 코드 개선을 수행했을 때
- [🛡️타입]: 타입과 관련된 작업을 수행했을 때
- [🔫트러블슈팅]: 버그, 에러와 관련된 문제를 해결했을 때
- [⚙️설정]: 설정과 관련된 작업을 수행할 떄
- [✍️문서]: 문서와 관련된 작업을 수행했을 때
- [🔍SEO]: SEO와 관련된 작업을 수행했을 때
- [🍱에셋]: 프로젝트에 에셋을 추가했을 때
- [🔥제거]: 프로젝트에서 파일을 제거했을 때
- [📦패키지]: 패키지를 설치했을 때
- [🔀병합]: 브랜치를 병합했을 때
- [🎸기타]: 위 항목으로 구분되기 어려울 정도로 사소한 작업을 수행했을 때

## 코드 컨벤션

1. 컴포넌트 선언은 export default 방식을 채택하고, 컴포넌트 내부의 유틸함수, 커스텀훅은 화살표 함수 방식을 채택한다.

2. 타입 선언은 `type` 방식을 채택한다.

3. 뷰와 로직을 분리해서 작업을 수행한다.

## 스타일 컨벤션

CSS 스타일 컨벤션은 NHN 컨벤션을 참조한다.

<details>
  <summary>NHN 컨벤션</summary>

```
"postcsssorting.config": {
  "properties-order":[
      /*Layout*/
      "display",
      "grid",
      "grid-column-gap",
      "grid-row-gap",
      "grid-auto-flow",
      "grid-auto-rows",
      "grid-auto-columns",
      "justify-items",
      "align-content",
      "place-items",
      "gap",
      "align-items",
      "justify-content",
      "flex-wrap",
      "flex-basis",
      "flex-grow",
      "flex-shrink",
      "flex",
      "align-self",
      "flex-direction",

      /* Box */
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "border",
      "border-top",
      "border-bottom",
      "border-right",
      "border-left",
      "border-style",
      "border-color",
      "border-top-width",
      "border-right-width",
      "border-bottom-width",
      "border-left-width",
      "border-top-style",
      "border-right-style",
      "border-bottom-style",
      "border-left-style",
      "border-top-color",
      "border-right-color",
      "border-bottom-color",
      "border-left-color",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-bottom-right-radius",
      "border-bottom-left-radius",
      "outline",
      "outline-width",
      "outline-style",
      "outline-color",
      "outline-offset",
      "box-shadow",
      "overflow",
      "overflow-x",
      "overflow-y",
      "clip",
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "float",
      "clear",
      "visibility",
      "vertical-align",

      /* Background */
      "background",
      "background-color",
      "background-image",
      "background-repeat",
      "background-attachment",
      "background-position",
      "background-clip",
      "background-origin",
      "background-size",

      /* Font */
      "font-family",
      "font-size",
      "font-style",
      "font-weight",
      "line-height",
      "color",
      "text-align",
      "text-decoration",
      "text-transform",
      "letter-spacing",
      "text-shadow",
      "white-space",
      "word-spacing",
      "word-break",
      "word-wrap",
      "text-indent",
      "direction",
      "unicode-bidi",
      "hyphens",

      /* Animation and Transition */
      "animation",
      "animation-name",
      "animation-duration",
      "animation-timing-function",
      "animation-delay",
      "animation-iteration-count",
      "animation-direction",
      "animation-fill-mode",
      "animation-play-state",
      "transition",
      "transition-property",
      "transition-duration",
      "transition-timing-function",
      "transition-delay",

      /* Other */
      "content",
      "counter-reset",
      "counter-increment",
      "quotes",
      "list-style",
      "list-style-position",
      "list-style-type",
      "caption-side",
      "empty-cells",
      "table-layout",
      "pointer-events",
      "cursor",
      "resize",
      "overflow-wrap",
      "scroll-snap-type",
      "scroll-padding",
      "scroll-padding-top",
      "scroll-padding-right",
      "scroll-padding-bottom",
      "scroll-padding-left",
      "scroll-behavior",
      "scroll-snap-align",
      "scroll-snap-margin",
      "scroll-snap-stop",
      "scrollbar-width",
      "scrollbar-color"
    ] ;
}
```

</details>
