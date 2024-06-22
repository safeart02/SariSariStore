const images = ["ssfront/image1.png", "ssfront/image2.png", "ssfront/image3.png"];
let currentIndex = 0;

function changeImage() {
  currentIndex = (currentIndex + 1) % images.length;
  const imageElement = document.getElementById("image");
  imageElement.style.opacity = 0;
  setTimeout(() => {
    imageElement.src = images[currentIndex];
    imageElement.style.opacity = 1;
  }, 1000);
}

setInterval(changeImage, 5000);

let totalPrice = 0;

function updateCount(amountId, stockId, value) {
    let amountElement = document.getElementById(amountId);
    let stockElement = document.getElementById(stockId);
    let amount = parseInt(amountElement.textContent);
    let stock = parseInt(stockElement.textContent);

    let newAmount = amount + value;

    if (newAmount < 0) {
        newAmount = 0;
    } else if (newAmount > 20) {
        newAmount = 20;
    }

    amountElement.textContent = newAmount;

    let newStock = stock - value;

    if (newStock < 0) {
        newStock = 0;
    } else if (newStock > 20) {
        newStock = 20;
    }

    stockElement.textContent = newStock;

    let priceData = amountElement.parentElement.getAttribute('data-price');
    let price = parseInt(priceData);
    updateSelectedItems(amountElement.parentElement.querySelector('p').textContent, newAmount - amount, price);
    updateTotalPrice();
}

function updateSelectedItems(name, amountChange, price) {
    let selectedItemContainer = document.getElementById('selectedItemContainer');
    let items = selectedItemContainer.querySelectorAll('.selected-item');
    let itemFound = false;

    items.forEach(item => {
        if (item.textContent.includes(name)) {
            itemFound = true;
            let itemCount = parseInt(item.textContent.split('x')[1].split('=')[0].trim()) + amountChange;
            if (itemCount === 0) {
                item.remove();
            } else {
                let total = itemCount * price;
                item.textContent = name + ' x ' + itemCount + ' = ₱' + total;
            }
        }
    });

    if (!itemFound && amountChange !== 0) {
        let itemInfo = document.createElement('div');
        itemInfo.classList.add('selected-item');
        itemInfo.textContent = name + ' x 1 = ₱' + price;
        selectedItemContainer.appendChild(itemInfo);
    }
}

function updateTotalPrice() {
    console.log("Updating total price...");

    let totalElement = document.getElementById('totalPrice');
    let selectedItemsContainer = document.getElementById('selectedItemContainer');

    console.log("Total element:", totalElement);
    console.log("Selected items container:", selectedItemsContainer);

    if (!totalElement || !selectedItemsContainer) {
        console.error("Total price or selected items container not found in the DOM.");
        return;
    }

    let selectedItems = selectedItemsContainer.children;

    totalPrice = 0;

    for (let i = 0; i < selectedItems.length; i++) {
        let itemText = selectedItems[i].textContent;
        let itemPriceMatch = itemText.match(/₱\d+(\.\d+)?/);
        if (itemPriceMatch) {
            let itemPrice = parseFloat(itemPriceMatch[0].substr(1));
            totalPrice += itemPrice;
        } else {
            console.log("Invalid item price format:", itemText);
        }
    }

    totalElement.textContent = totalPrice.toFixed(2);
    console.log("Total price updated to:", totalPrice.toFixed(2));
}

function smoothScroll(targetId) {
  const targetPosition = document.querySelector(targetId).offsetTop;
  window.scroll({
    top: targetPosition,
    behavior: "smooth"
  });
}

var container = document.querySelector('.connn');

window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY || window.pageYOffset;

    container.style.top = Math.min(0, 100 - scrollPosition) + 'px';
});

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
window.addEventListener('scroll', function() {
        var footer = document.getElementById('footer');
        var scrollPosition = window.scrollY;
        var windowHeight = window.innerHeight;
        var bodyHeight = document.body.offsetHeight;

        // Adjust the value as needed for the threshold
        var threshold = 100;

        // Check if user is at the top or bottom of the page
        if (scrollPosition < threshold || scrollPosition > (bodyHeight - windowHeight - threshold)) {
            footer.classList.add('hidden'); // Hide the footer
        } else {
            footer.classList.remove('hidden'); // Show the footer
        }
    });