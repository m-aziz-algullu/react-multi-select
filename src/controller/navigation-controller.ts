import { RefObject } from "react";

import { CharacterPicked } from "@/types/character";

type FocusedCharacter = CharacterPicked;
type TSelectedCharactersContainerRef = RefObject<HTMLDivElement>;
type TModalRef = RefObject<HTMLDivElement>;
type TDispatchFocusedCharacter = (character: CharacterPicked) => void;
type TDispatchSelectCharacter = (character: CharacterPicked) => void;
type TDispatchDeSelectCharacter = (character: CharacterPicked) => void;
type TNavigatePlace = "filteredCharacterPlace" | "selectedCharacterPlace";
type TNavigateType =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowRight"
  | "ArrowLeft"
  | null;

export default class NavigationController {
  private focusedCharacter!: FocusedCharacter;
  private selectedCharacters!: Array<CharacterPicked>;
  private filteredCharacters!: Array<CharacterPicked>;
  private navigatePlace: TNavigatePlace = "filteredCharacterPlace";
  private navigateType: TNavigateType = null;
  private dispatchFocusedCharacter: TDispatchFocusedCharacter;
  private dispatchSelectCharacter: TDispatchSelectCharacter;
  private dispatchDeSelectCharacter: TDispatchDeSelectCharacter;
  private modalRef!: TModalRef;
  private selectedCharactersContainerRef!: TSelectedCharactersContainerRef;

  constructor(
    dispatchFocusedCharacter: TDispatchFocusedCharacter,
    dispatchSelectCharacter: TDispatchSelectCharacter,
    dispatchDeSelectCharacter: TDispatchDeSelectCharacter
  ) {
    this.dispatchFocusedCharacter = dispatchFocusedCharacter;
    this.dispatchSelectCharacter = dispatchSelectCharacter;
    this.dispatchDeSelectCharacter = dispatchDeSelectCharacter;
  }

  // start the instance
  public start() {
    window.addEventListener("keydown", this.handleKeyPress.bind(this));
  }
  // end the instance
  public end() {
    window.removeEventListener("keydown", this.handleKeyPress.bind(this));
  }

  // getters
  private getModalRef(): TModalRef {
    return this.modalRef;
  }
  private getSelectedCharactersContainerRef(): TSelectedCharactersContainerRef {
    return this.selectedCharactersContainerRef;
  }
  private getFocusedCharacter(): FocusedCharacter {
    return this.focusedCharacter;
  }
  private getFilteredCharacters(): Array<CharacterPicked> {
    return this.filteredCharacters;
  }
  private getSelectedCharacters(): Array<CharacterPicked> {
    return this.selectedCharacters;
  }
  private getNavigatePlace(): TNavigatePlace {
    return this.navigatePlace;
  }
  private getNavigateType(): TNavigateType {
    return this.navigateType;
  }
  private getInputFromSelectedCharactersContainer(): Partial<HTMLInputElement> {
    return this.getSelectedCharactersContainerRef().current!.children[
      this.getSelectedCharactersContainerRef().current!.children.length - 2
    ];
  }

  // setters
  public setModalRef(modalRef: TModalRef): void {
    this.modalRef = modalRef;
  }
  public setSelectedCharactersContainerRef(
    getSelectedCharactersContainerRef: TSelectedCharactersContainerRef
  ): void {
    this.selectedCharactersContainerRef = getSelectedCharactersContainerRef;
  }
  public setFocusedCharacter(character: CharacterPicked): void {
    this.focusedCharacter = character;
    this.dispatchFocusedCharacter(character);
  }
  public setFilteredCharacters(characters: Array<CharacterPicked>): void {
    this.filteredCharacters = characters;
  }
  public setSelectedCharacters(characters: Array<CharacterPicked>): void {
    this.selectedCharacters = characters;
  }
  private setNavigatePlace(val: TNavigatePlace): void {
    this.navigatePlace = val;
  }
  private setNavigateType(val: TNavigateType): void {
    this.navigateType = val;
  }

  // handlers
  private handleKeyPress(e: KeyboardEvent): void {
    if (e.key == "ArrowDown") {
      e.preventDefault();
      this.setNavigateType("ArrowDown");

      if (this.getFilteredCharacters().length == 0) return;
      const currentNavigatePlace = this.getNavigatePlace();
      if (currentNavigatePlace == "selectedCharacterPlace") {
        this.setNavigatePlace("filteredCharacterPlace");
      }

      const newNavigatePlace: TNavigatePlace = "filteredCharacterPlace";
      this.handleUpDownKeyboardEvent(
        this.getNewIndex(currentNavigatePlace, newNavigatePlace)
      );
    } else if (e.key == "ArrowUp") {
      e.preventDefault();
      this.setNavigateType("ArrowUp");

      if (this.getFilteredCharacters().length == 0) return;
      const currentNavigatePlace = this.getNavigatePlace();

      const newNavigatePlace: TNavigatePlace = "filteredCharacterPlace";
      if (currentNavigatePlace == "selectedCharacterPlace") {
        this.setNavigatePlace("filteredCharacterPlace");
      }

      this.handleUpDownKeyboardEvent(
        this.getNewIndex(currentNavigatePlace, newNavigatePlace)
      );
    } else if (e.key == "ArrowRight") {
      this.setNavigateType("ArrowRight");
      if (this.getSelectedCharacters().length == 0) return;

      const currentNavigatePlace = this.getNavigatePlace();
      if (currentNavigatePlace == "filteredCharacterPlace") {
        this.setNavigatePlace("selectedCharacterPlace");
      }

      const newNavigatePlace: TNavigatePlace = "selectedCharacterPlace";
      this.handleRightLeftKeyboardEvent(
        this.getNewIndex(currentNavigatePlace, newNavigatePlace)
      );
    } else if (e.key == "ArrowLeft") {
      this.setNavigateType("ArrowLeft");
      if (this.getSelectedCharacters().length == 0) return;

      const currentNavigatePlace = this.getNavigatePlace();
      if (currentNavigatePlace == "filteredCharacterPlace") {
        this.setNavigatePlace("selectedCharacterPlace");
      }

      const newNavigatePlace: TNavigatePlace = "selectedCharacterPlace";
      this.handleRightLeftKeyboardEvent(
        this.getNewIndex(currentNavigatePlace, newNavigatePlace)
      );
    } else if (e.key == "Enter") {
      this.handleEnterKeyboardEvent();
    } else if (e.key == "Backspace") {
      this.handleBackspaceKeyboardEvent();
    } else if (e.key == "Tab") {
      e.preventDefault();
      this.handleTabKeyboardEvent();
    } else {
      if (!this.isInputFocused()) this.focusInput();
    }
  }
  private handleUpDownKeyboardEvent(index: number): void {
    if (this.getFilteredCharacters().length == 0) return;

    this.setBgColor(index);
    this.setFocusedCharacter(this.getFilteredCharacters()[index]);
    this.ensureVisibleModal(
      this.getModalRef().current!.children[index] as HTMLDivElement
    );
  }
  private handleRightLeftKeyboardEvent(index: number): void {
    if (this.getSelectedCharacters().length == 0) return;

    this.setBgColor(index);
    this.setFocusedCharacter(this.getSelectedCharacters()[index]);
    this.checkInputFocus();
  }
  private handleEnterKeyboardEvent() {
    if (!this.getFocusedCharacter()) return;
    this.dispatchSelectCharacter(this.getFocusedCharacter());
  }
  private handleBackspaceKeyboardEvent() {
    if (this.getNavigatePlace() == "filteredCharacterPlace") {
      this.dispatchDeSelectCharacter(this.getFocusedCharacter());
    }

    const inputValue = this.getInputFromSelectedCharactersContainer().value!;

    if (
      (!this.getFocusedCharacter() || this.isInputFocused()) &&
      inputValue.length > 0
    ) {
      return;
    }

    const promise = new Promise((resolve) => {
      resolve(this.dispatchDeSelectCharacter(this.getFocusedCharacter()));
    });

    promise.then(() => {
      if (this.getNavigatePlace() == "selectedCharacterPlace") {
        const index = this.getSelectedCharacters().findIndex(
          (c) => c.id == this.getFocusedCharacter().id
        );

        if (index == -1) {
          this.focusInput();
        } else this.setBgColor(index);
      }
    });
  }
  private handleTabKeyboardEvent() {
    const newIndex = this.getNewIndex(
      this.getNavigatePlace(),
      this.getNavigatePlace()
    );

    if (this.getNavigatePlace() == "selectedCharacterPlace") {
      this.setNavigateType("ArrowRight");
      this.handleRightLeftKeyboardEvent(newIndex);
    } else if (this.getNavigatePlace() == "filteredCharacterPlace") {
      this.setNavigateType("ArrowDown");
      this.handleUpDownKeyboardEvent(newIndex);
    }
  }

  // helpers
  private getNewIndex(
    currentNavigatePlace: TNavigatePlace,
    newNavigatePlace: TNavigatePlace
  ): number {
    const currentNavigateType = this.getNavigateType();
    let newIndex = -1;

    if (currentNavigatePlace != newNavigatePlace) {
      newIndex = 0;
    } else {
      const items =
        newNavigatePlace == "filteredCharacterPlace"
          ? this.getFilteredCharacters()
          : this.getSelectedCharacters();

      const currentIndex = items.findIndex(
        (c) => c.id == this.getFocusedCharacter()?.id
      );

      if (
        currentNavigateType == "ArrowUp" ||
        currentNavigateType == "ArrowLeft"
      ) {
        newIndex =
          currentIndex == 0
            ? items.length - 1
            : currentIndex == -1
            ? 0
            : currentIndex - 1;
      } else if (
        currentNavigateType == "ArrowDown" ||
        currentNavigateType == "ArrowRight"
      ) {
        newIndex = currentIndex == items.length - 1 ? 0 : currentIndex + 1;
      }
    }

    return newIndex;
  }
  private checkInputFocus(): void {
    if (this.getSelectedCharacters().length == 1) {
      if (this.getNavigateType() == "ArrowLeft") {
        this.deFocusInput();
      } else if (this.getNavigateType() == "ArrowRight") {
        this.focusInput();
        this.removeBgFromAll();
        this.setFocusedCharacter({} as CharacterPicked);
      }
    } else if (
      this.getFocusedCharacter().id ==
      this.getSelectedCharacters()[this.getSelectedCharacters().length - 1].id
    ) {
      this.focusInput();
    } else {
      this.deFocusInput();
    }
  }
  private focusInput(): void {
    const input = this.selectedCharactersContainerRef.current!.children[
      this.getSelectedCharacters().length
    ] as HTMLInputElement;
    input.focus();
  }
  private isInputFocused(): boolean {
    const input = this.selectedCharactersContainerRef.current!.children[
      this.getSelectedCharacters().length
    ] as HTMLInputElement;

    return input === document.activeElement;
  }
  private deFocusInput(): void {
    const input = this.selectedCharactersContainerRef.current!.children[
      this.getSelectedCharacters().length
    ] as HTMLInputElement;
    input.blur();
  }

  // manipulate DOM
  private ensureVisibleModal(element: HTMLDivElement): void {
    if (!this.getModalRef().current) return;

    const modalRect = this.getModalRef().current!.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    if (elementRect.bottom > modalRect.bottom) {
      this.getModalRef().current!.scrollTop +=
        elementRect.bottom - modalRect.bottom;
    } else if (elementRect.top < modalRect.top) {
      this.getModalRef().current!.scrollTop -= modalRect.top - elementRect.top;
    }
  }
  private removeBgFromAll(): void {
    const modalRef = this.getModalRef().current;
    const selectedCharactersContainerRef =
      this.getSelectedCharactersContainerRef().current;

    if (modalRef) {
      Array.from(modalRef.children).forEach((child) => {
        child.classList.toggle("gray-bg", false);
      });
    }

    if (selectedCharactersContainerRef) {
      Array.from(selectedCharactersContainerRef.children).forEach((child) => {
        child.classList.toggle("gray-bg", false);
      });
    }
  }
  private setBgColor(index: number): void {
    this.removeBgFromAll();

    if (this.getNavigatePlace() == "filteredCharacterPlace") {
      this.getModalRef().current!.children[index].classList.add("gray-bg");
    } else {
      this.getSelectedCharactersContainerRef().current!.children[
        index
      ].classList.add("gray-bg");
    }
  }
}
