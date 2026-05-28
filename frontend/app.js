const sqlCode = document.getElementById("sqlCode");
const clearBtn = document.getElementById("clearBtn");
const runBtn = document.getElementById("runBtn");
const spinner = document.getElementById("spinner");
const resultContent = document.getElementById("resultContent");

const increaseFontBtn = document.getElementById("increaseFontBtn");
const decreaseFontBtn = document.getElementById("decreaseFontBtn");

const contrastBtn = document.getElementById("contrastBtn");

let currentFontSize = 16;

clearBtn.addEventListener("click", () => {
  sqlCode.value = "";
  sqlCode.focus();
});

increaseFontBtn.addEventListener("click", () => {
  currentFontSize += 2;

  sqlCode.style.fontSize = `${currentFontSize}px`;
  resultContent.style.fontSize = `${currentFontSize}px`;
});

decreaseFontBtn.addEventListener("click", () => {
  if (currentFontSize > 12) {
    currentFontSize -= 2;

    sqlCode.style.fontSize = `${currentFontSize}px`;
    resultContent.style.fontSize = `${currentFontSize}px`;
  }
});

contrastBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("high-contrast");
});

runBtn.addEventListener("click", async () => {
  const sql = sqlCode.value.trim();

  if (!sql) {
    resultContent.innerHTML = "Please type a SQL query.";
    return;
  }

  spinner.classList.remove("d-none");
  resultContent.innerHTML = "";

  try {
    const response = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql }),
    });

    const data = await response.json();

    spinner.classList.add("d-none");

    if (data.error) {
      resultContent.innerHTML = `
                <div class="text-danger">
                    ${data.error}
                </div>
            `;
      return;
    }

    if (!data.results || data.results.length === 0) {
      resultContent.innerHTML = "No results.";
      return;
    }

    let table = `
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
        `;

    Object.keys(data.results[0]).forEach((column) => {
      table += `<th>${column}</th>`;
    });

    table += `
                        </tr>
                    </thead>
                    <tbody>
        `;

    data.results.forEach((row) => {
      table += `<tr>`;

      Object.values(row).forEach((value) => {
        table += `<td>${value}</td>`;
      });

      table += `</tr>`;
    });

    table += `
                    </tbody>
                </table>
            </div>
        `;

    resultContent.innerHTML = table;
  } catch (error) {
    spinner.classList.add("d-none");

    resultContent.innerHTML = `
            <div class="text-danger">
                Connection error.
            </div>
        `;
  }
});
