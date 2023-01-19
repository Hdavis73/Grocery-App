const deleteBtn = document.querySelectorAll('.delete-item');
const groceryItem = document.querySelectorAll('.item span');
const obtainedItem = document.querySelectorAll('.item span.obtained');

Array.from(deleteBtn).forEach((btn) => {
  btn.addEventListener('click', deleteItem);
});

Array.from(groceryItem).forEach((item) => {
  item.addEventListener('click', markObtained);
});

async function markObtained() {
  const itemText = this.parentNode.childNodes[1].innerText;

  try {
    const response = await fetch('markObtained', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemFromJs: itemText,
      }),
    });

    const data = await response.json();
    console.log(data);
    // location.reload()
  } catch (err) {
    console.log(err);
  }
}

async function deleteItem() {
  const itemText = this.parentNode.childNodes[1].innerText;
  //   console.log(itemText);

  try {
    const response = await fetch('deleteItem', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemFromJs: itemText,
      }),
    });

    const data = await response.json();
    console.log(data);

    location.reload();
  } catch (err) {
    console.log(err);
  }
}
