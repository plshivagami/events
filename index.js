const $app = document.querySelector("#app");
const bank = [];
const odds = [];
const evens = [];
const containers = {};

// Setup the form and sections
const start = () => {
  const $h1 = document.createElement("h1");
  $h1.textContent = "Odds and Evens";
  app.append($h1);

  const $form = document.createElement("form");
  // $form.className = "form-group";

  const $label = document.createElement("label");
  $label.textContent = "Add a number to the Bank";
  $form.append($label);
  const $input = document.createElement("input");
  $input.type = "number";
  //$input.className = "form-control";
  $input.required = true;
  $form.append($input);

  const $addBtn = document.createElement("button");
  $addBtn.type = "submit";
  $addBtn.textContent = "Add number";
  // $addBtn.className = "btn btn-primary";
  $form.append($addBtn);
  const $sortOneBtn = document.createElement("button");
  $sortOneBtn.type = "button";
  $sortOneBtn.textContent = "Sort 1";
  //$sortOneBtn.className = "btn btn-primary";
  $sortOneBtn.style.marginLeft = "10px";
  $form.append($sortOneBtn);

  const $sortAllBtn = document.createElement("button");
  $sortAllBtn.type = "button";
  $sortAllBtn.textContent = "Sort All";
  // $sortAllBtn.className = "btn btn-primary";
  $sortAllBtn.style.marginLeft = "10px";
  $form.append($sortAllBtn);

  $app.append($form);
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const num = parseInt($input.value);
    if (!isNaN(num)) {
      bank.push(num);
      renderBox(bank, containers.bank);
      $input.value = "";
    }
  });

  $sortOneBtn.addEventListener("click", () => {
    const num = bank.shift();
    if (num === undefined) return;
    (num % 2 === 0 ? evens : odds).push(num);
    renderBox(bank, containers.bank);
    renderBox(odds, containers.odds);
    renderBox(evens, containers.evens);
  });
  $sortAllBtn.addEventListener("click", () => {
    while (bank.length > 0) {
      const num = bank.shift();
      (num % 2 === 0 ? evens : odds).push(num);
    }
    renderBox(bank, containers.bank);
    renderBox(odds, containers.odds);
    renderBox(evens, containers.evens);
  });
};
start();

const sections = ["Bank", "Odds", "Evens"];
sections.forEach((name) => {
  const $h3 = document.createElement("h3");
  $h3.textContent = name;
  $app.appendChild($h3);
  const $box = document.createElement("div");
  $box.style.border = "1px solid #000";
  $box.style.borderRadius = "8px";
  $box.style.padding = "10px";
  $box.style.minHeight = "30px";
  $box.style.marginBottom = "20px";

  containers[name.toLowerCase()] = $box;
  $app.appendChild($box);
});

function renderBox(arr, box) {
  box.textContent = arr.join(" ");
}
