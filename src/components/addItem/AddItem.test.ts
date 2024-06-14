// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import {AddItem} from './AddItem'
//
// let container: HTMLElement | null = null;
// beforeEach(() => {
//     // подготавливаем DOM-элемент, куда будем рендерить
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });
//
// afterEach(() => {
//     // подчищаем после завершения
//     unmountComponentAtNode(container as HTMLElement);
//     if (container !== null) {
//         container.remove();
//     }
//     container = null;
// });
//
// it("renders with or without a name", () => {
//     act(() => {
//         render(<AddItem /> , container);
//     });
//     expect(container.textContent).toBe("Hey, stranger");
// });