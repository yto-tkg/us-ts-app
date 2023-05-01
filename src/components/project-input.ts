import Component from "./base-component";
import { Validatable, validate } from "../util/validation";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  discliptionInputElement: HTMLInputElement;
  mondayInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.discliptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.mondayInputElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private clearInputs() {
    this.titleInputElement.value = "";
    this.discliptionInputElement.value = "";
    this.mondayInputElement.value = "";
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDiscription = this.discliptionInputElement.value;
    const enteredManday = this.mondayInputElement.value;
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDiscription,
      required: true,
    };
    const mandayValidatable: Validatable = {
      value: enteredManday,
      required: true,
    };

    if (
      !validate(titleValidatable) &&
      !validate(descriptionValidatable) &&
      !validate(mandayValidatable)
    ) {
      alert("入力値が正しくありません。");
      return;
    } else {
      return [enteredTitle, enteredDiscription, +enteredManday];
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      projectState.addProject(title, desc, manday);
      this.clearInputs();
    }
  }
}
