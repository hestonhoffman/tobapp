// helper function to get the value of the selected option
export function getSelectValue(element: HTMLSelectElement): string {
  let sel = element.selectedIndex;
  let opt = element.options[sel];
  return opt.value;
}

export function insertSelectorValue(value: string, id: string): void {
  let targetSelector = document.getElementById(id) as HTMLOptionElement;
  const optionElement = document.createElement("option");
  optionElement.text = value;
  targetSelector.append(optionElement);
}

export function getTargetId(selectorId: string, targetPrefix: string): string {
  return (
    targetPrefix + Math.ceil(parseInt(selectorId.split("-")[1]) / 2).toString()
  );
}
