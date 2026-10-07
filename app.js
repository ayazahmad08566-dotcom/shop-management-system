const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let products = [];
let sales = [];
let customers = [];

// Load Products
if (fs.existsSync("products.json")) {
    const data = fs.readFileSync("products.json", "utf8");
    if (data.trim() !== "") {
        products = JSON.parse(data);
    }
}

// Load Sales
if (fs.existsSync("sales.json")) {
    const data = fs.readFileSync("sales.json", "utf8");
    if (data.trim() !== "") {
        sales = JSON.parse(data);
    }
}

// Load Customers
if (fs.existsSync("customers.json")) {
    const data = fs.readFileSync("customers.json", "utf8");
    if (data.trim() !== "") {
        customers = JSON.parse(data);
    }
}


// Save Products
function saveProducts() {
    fs.writeFileSync(
        "products.json",
        JSON.stringify(products, null, 2)
    );
}


// Save Sales
function saveSales() {
    fs.writeFileSync(
        "sales.json",
        JSON.stringify(sales, null, 2)
    );
}


// Save Customers
function saveCustomers() {
    fs.writeFileSync(
        "customers.json",
        JSON.stringify(customers, null, 2)
    );
}


// Main Menu
function showMenu() {

    console.log("\n================================");
    console.log("      SHOP MANAGEMENT SYSTEM");
    console.log("================================");

    console.log("\n1. Add Product");
    console.log("2. View Products");
    console.log("3. Add Sale");
    console.log("4. View Sales");
    console.log("5. Total Sales");
    console.log("6. Add Customer");
    console.log("7. View Customers");
    console.log("8. Exit");
    console.log("9. Search Product");
    console.log("10. Update Product");
    console.log("11. Delete Product");
    console.log("12. Low Stock Alert");
    console.log("13. Sales Report");
    console.log("14. Customer Sales Report");
    console.log("15. Product Sales Report");
    console.log("16. Inventory Report");
    console.log("17. Dashboard");


    rl.question("\nSelect an option: ", function(choice) {

        if (choice === "1") {
            addProduct();
        }

        else if (choice === "2") {
            viewProducts();
        }

        else if (choice === "3") {
            addSale();
        }

        else if (choice === "4") {
            viewSales();
        }

        else if (choice === "5") {
            totalSales();
        }

        else if (choice === "6") {
            addCustomer();
        }

        else if (choice === "7") {
            viewCustomers();
        }

        else if (choice === "8") {
            console.log("\nGoodbye!");
            rl.close();
        }

        else if (choice === "9") {
            searchProduct();
        }
        else if (choice === "10") {
    updateProduct();
}
        else if (choice === "11") {
    deleteProduct();
}
    else if (choice === "12") {
    lowStockAlert();
}
    else if (choice === "13") {
    salesReport();
}
    else if (choice === "14") {
    customerSalesReport();
}
    else if (choice === "15") {
    productSalesReport();
}
    else if (choice === "16") {
    inventoryReport();
}
    else if (choice === "17") {
    dashboard();
}
        else {
            console.log("\nInvalid option.");
            showMenu();
        }
    });
}


// Add Product
function addProduct() {

    rl.question("\nEnter product name: ", function(name) {

        rl.question("Enter quantity: ", function(quantity) {

            rl.question("Enter price: ", function(price) {

                const product = {
                    name: name,
                    quantity: Number(quantity),
                    price: Number(price)
                };

                products.push(product);

                saveProducts();

                console.log("\n----------------------------");
                console.log("Product Added Successfully!");
                console.log("----------------------------");
                console.log("Product:", product.name);
                console.log("Quantity:", product.quantity);
                console.log("Price:", product.price);
                console.log("----------------------------");

                showMenu();
            });
        });
    });
}


// View Products
function viewProducts() {

    console.log("\n========== PRODUCTS ==========");

    if (products.length === 0) {
        console.log("No products found.");
    }

    else {
        products.forEach(function(product, index) {

            console.log("\nProduct #" + (index + 1));
            console.log("Name:", product.name);
            console.log("Quantity:", product.quantity);
            console.log("Price:", product.price);
        });
    }

    console.log("\n==============================");

    showMenu();
}


// Add Sale
function addSale() {

    if (products.length === 0) {
        console.log("\nNo products available.");
        showMenu();
        return;
    }

    if (customers.length === 0) {
        console.log("\nNo customers available.");
        console.log("Please add a customer first.");
        showMenu();
        return;
    }

    console.log("\n========== CUSTOMERS ==========");

    customers.forEach(function(customer, index) {

        console.log(
            (index + 1) +
            ". " +
            customer.name +
            " | Mobile: " +
            customer.mobile
        );
    });

    rl.question(
        "\nSelect customer number: ",
        function(customerNumber) {

            const customerIndex =
                Number(customerNumber) - 1;

            if (
                customerIndex < 0 ||
                customerIndex >= customers.length
            ) {

                console.log("\nInvalid customer number.");
                showMenu();
                return;
            }

            const customer =
                customers[customerIndex];

            console.log("\n========== PRODUCTS ==========");

            products.forEach(function(product, index) {

                console.log(
                    (index + 1) +
                    ". " +
                    product.name +
                    " | Stock: " +
                    product.quantity +
                    " | Price: " +
                    product.price
                );
            });

            rl.question(
                "\nSelect product number: ",
                function(productNumber) {

                    const productIndex =
                        Number(productNumber) - 1;

                    if (
                        productIndex < 0 ||
                        productIndex >= products.length
                    ) {

                        console.log("\nInvalid product number.");
                        showMenu();
                        return;
                    }

                    const product =
                        products[productIndex];

                    rl.question(
                        "Enter sale quantity: ",
                        function(saleQuantity) {

                            const quantity =
                                Number(saleQuantity);

                            if (quantity <= 0) {

                                console.log(
                                    "\nInvalid quantity."
                                );

                                showMenu();
                                return;
                            }

                            if (
                                quantity >
                                product.quantity
                            ) {

                                console.log(
                                    "\nNot enough stock!"
                                );

                                console.log(
                                    "Available stock:",
                                    product.quantity
                                );

                                showMenu();
                                return;
                            }

                            const total =
                                quantity *
                                product.price;

                            product.quantity -= quantity;

                            sales.push({
                                customer: customer.name,
                                mobile: customer.mobile,
                                product: product.name,
                                quantity: quantity,
                                price: product.price,
                                total: total
                            });

                            saveProducts();
                            saveSales();

                            console.log(
                                "\n----------------------------"
                            );

                            console.log(
                                "Sale Added Successfully!"
                            );

                            console.log(
                                "----------------------------"
                            );

                            console.log(
                                "Customer:",
                                customer.name
                            );

                            console.log(
                                "Mobile:",
                                customer.mobile
                            );

                            console.log(
                                "Product:",
                                product.name
                            );

                            console.log(
                                "Quantity Sold:",
                                quantity
                            );

                            console.log(
                                "Price:",
                                product.price
                            );

                            console.log(
                                "Total:",
                                total
                            );

                            console.log(
                                "Remaining Stock:",
                                product.quantity
                            );

                            console.log(
                                "----------------------------"
                            );

                            showMenu();
                        }
                    );
                }
            );
        }
    );
}


// View Sales
function viewSales() {

    console.log("\n========== SALES ==========");

    if (sales.length === 0) {

        console.log("No sales found.");

    }

    else {

        sales.forEach(function(sale, index) {

            console.log(
                "\nSale #" + (index + 1)
            );

            console.log(
                "Customer:",
                sale.customer || "Old Sale"
            );

            console.log(
                "Mobile:",
                sale.mobile || "N/A"
            );

            console.log(
                "Product:",
                sale.product
            );

            console.log(
                "Quantity:",
                sale.quantity
            );

            console.log(
                "Price:",
                sale.price
            );

            console.log(
                "Total:",
                sale.total
            );
        });
    }

    console.log("\n==========================");

    showMenu();
}


// Total Sales
function totalSales() {

    console.log(
        "\n========== TOTAL SALES =========="
    );

    let totalRevenue = 0;

    sales.forEach(function(sale) {
        totalRevenue += Number(sale.total);
    });

    console.log(
        "Total Sales Amount:",
        totalRevenue
    );

    console.log(
        "================================="
    );

    showMenu();
}


// Add Customer
function addCustomer() {

    rl.question(
        "\nEnter customer name: ",
        function(name) {

            rl.question(
                "Enter mobile number: ",
                function(mobile) {

                    rl.question(
                        "Enter address: ",
                        function(address) {

                            const customer = {
                                name: name,
                                mobile: mobile,
                                address: address
                            };

                            customers.push(customer);

                            saveCustomers();

                            console.log(
                                "\n----------------------------"
                            );

                            console.log(
                                "Customer Added Successfully!"
                            );

                            console.log(
                                "----------------------------"
                            );

                            console.log(
                                "Name:",
                                customer.name
                            );

                            console.log(
                                "Mobile:",
                                customer.mobile
                            );

                            console.log(
                                "Address:",
                                customer.address
                            );

                            console.log(
                                "----------------------------"
                            );

                            showMenu();
                        }
                    );
                }
            );
        }
    );
}


// View Customers
function viewCustomers() {

    console.log(
        "\n========== CUSTOMERS =========="
    );

    if (customers.length === 0) {

        console.log(
            "No customers found."
        );

    }

    else {

        customers.forEach(function(customer, index) {

            console.log(
                "\nCustomer #" + (index + 1)
            );

            console.log(
                "Name:",
                customer.name
            );

            console.log(
                "Mobile:",
                customer.mobile
            );

            console.log(
                "Address:",
                customer.address
            );
        });
    }

    console.log(
        "\n=============================="
    );

    showMenu();
}
// Search Product
function searchProduct() {

    rl.question(
        "\nEnter product name: ",
        function(name) {

            const searchName =
                name.toLowerCase().trim();

            const foundProducts =
                products.filter(function(product) {

                    return product.name
                        .toLowerCase()
                        .includes(searchName);
                });

            if (foundProducts.length === 0) {

                console.log(
                    "\nProduct not found."
                );

            } else {

                console.log(
                    "\n========== SEARCH RESULTS =========="
                );

                foundProducts.forEach(function(product) {

                    console.log(
                        "\nName:",
                        product.name
                    );

                    console.log(
                        "Stock:",
                        product.quantity
                    );

                    console.log(
                        "Price:",
                        product.price
                    );
                });

                console.log(
                    "\n===================================="
                );
            }

            showMenu();
        }
    );
}

// Update Product
function updateProduct() {

    rl.question(
        "\nEnter product name: ",
        function(name) {

            const searchName =
                name.toLowerCase().trim();

            const product =
                products.find(function(product) {

                    return product.name
                        .toLowerCase()
                        .trim() === searchName;
                });

            if (!product) {

                console.log(
                    "\nProduct not found."
                );

                showMenu();
                return;
            }

            console.log(
                "\nCurrent Stock:",
                product.quantity
            );

            console.log(
                "Current Price:",
                product.price
            );

            rl.question(
                "\nEnter new quantity: ",
                function(quantity) {

                    rl.question(
                        "Enter new price: ",
                        function(price) {

                            product.quantity =
                                Number(quantity);

                            product.price =
                                Number(price);

                            saveProducts();

                            console.log(
                                "\nProduct Updated Successfully!"
                            );

                            console.log(
                                "Name:",
                                product.name
                            );

                            console.log(
                                "Stock:",
                                product.quantity
                            );

                            console.log(
                                "Price:",
                                product.price
                            );

                            showMenu();
                        }
                    );
                }
            );
        }
    );
}
// Delete Product
function deleteProduct() {

    rl.question(
        "\nEnter product name to delete: ",
        function(name) {

            const searchName =
                name.toLowerCase().trim();

            const productIndex =
                products.findIndex(function(product) {

                    return product.name
                        .toLowerCase()
                        .trim() === searchName;
                });

            if (productIndex === -1) {

                console.log(
                    "\nProduct not found."
                );

                showMenu();
                return;
            }

            const deletedProduct =
                products[productIndex];

            products.splice(productIndex, 1);

            saveProducts();

            console.log(
                "\nProduct Deleted Successfully!"
            );

            console.log(
                "Deleted Product:",
                deletedProduct.name
            );

            showMenu();
        }
    );
}
// Low Stock Alert
function lowStockAlert() {

    console.log("\n========== LOW STOCK ALERT ==========");

    const lowStockProducts = products.filter(function(product) {
        return product.quantity <= 5;
    });

    if (lowStockProducts.length === 0) {
        console.log("No low stock products.");
    }
    else {
        lowStockProducts.forEach(function(product) {
            console.log("\nProduct:", product.name);
            console.log("Stock:", product.quantity);
            console.log("Price:", product.price);
            console.log("⚠️ LOW STOCK!");
        });
    }

    console.log("\n=====================================");
    showMenu();
}
// Sales Report
function salesReport() {

    console.log("\n========== SALES REPORT ==========");

    let totalRevenue = 0;
    let totalQuantity = 0;

    if (sales.length === 0) {
        console.log("No sales found.");
    }
    else {
        sales.forEach(function(sale, index) {

            totalRevenue += Number(sale.total);
            totalQuantity += Number(sale.quantity);

            console.log("\nSale #" + (index + 1));
            console.log("Customer:", sale.customer || "Old Sale");
            console.log("Product:", sale.product);
            console.log("Quantity:", sale.quantity);
            console.log("Price:", sale.price);
            console.log("Total:", sale.total);
        });

        console.log("\n----------------------------------");
        console.log("Total Sales:", sales.length);
        console.log("Total Quantity Sold:", totalQuantity);
        console.log("Total Revenue:", totalRevenue);
    }

    console.log("==================================");

    showMenu();
}
// Customer Sales Report
function customerSalesReport() {

    rl.question(
        "\nEnter customer name: ",
        function(name) {

            const searchName = name.toLowerCase().trim();

            const customerSales = sales.filter(function(sale) {
                return sale.customer &&
                    sale.customer.toLowerCase().trim() === searchName;
            });

            if (customerSales.length === 0) {

                console.log("\nNo sales found for this customer.");

            }
            else {

                let customerTotal = 0;

                console.log("\n========== CUSTOMER SALES ==========");

                customerSales.forEach(function(sale, index) {

                    customerTotal += Number(sale.total);

                    console.log("\nSale #" + (index + 1));
                    console.log("Customer:", sale.customer);
                    console.log("Mobile:", sale.mobile || "N/A");
                    console.log("Product:", sale.product);
                    console.log("Quantity:", sale.quantity);
                    console.log("Price:", sale.price);
                    console.log("Total:", sale.total);
                });

                console.log("\n------------------------------------");
                console.log("Total Sales:", customerSales.length);
                console.log("Customer Total:", customerTotal);
            }

            console.log("====================================");

            showMenu();
        }
    );
}
// Product Sales Report
function productSalesReport() {

    rl.question(
        "\nEnter product name: ",
        function(name) {

            const searchName = name.toLowerCase().trim();

            const productSales = sales.filter(function(sale) {
                return sale.product &&
                    sale.product.toLowerCase().trim() === searchName;
            });

            if (productSales.length === 0) {

                console.log("\nNo sales found for this product.");

            }
            else {

                let totalQuantity = 0;
                let totalRevenue = 0;

                console.log("\n========== PRODUCT SALES ==========");

                productSales.forEach(function(sale, index) {

                    totalQuantity += Number(sale.quantity);
                    totalRevenue += Number(sale.total);

                    console.log("\nSale #" + (index + 1));
                    console.log("Customer:", sale.customer || "Old Sale");
                    console.log("Product:", sale.product);
                    console.log("Quantity:", sale.quantity);
                    console.log("Price:", sale.price);
                    console.log("Total:", sale.total);
                });

                console.log("\n-----------------------------------");
                console.log("Total Sales:", productSales.length);
                console.log("Total Quantity Sold:", totalQuantity);
                console.log("Total Revenue:", totalRevenue);
            }

            console.log("===================================");

            showMenu();
        }
    );
}
// Inventory Report
function inventoryReport() {

    console.log("\n========== INVENTORY REPORT ==========");

    if (products.length === 0) {
        console.log("No products found.");
    }
    else {
        let totalStockValue = 0;

        products.forEach(function(product, index) {

            const stockValue =
                Number(product.quantity) *
                Number(product.price);

            totalStockValue += stockValue;

            console.log("\nProduct #" + (index + 1));
            console.log("Name:", product.name);
            console.log("Stock:", product.quantity);
            console.log("Price:", product.price);
            console.log("Stock Value:", stockValue);
        });

        console.log("\n--------------------------------------");
        console.log("Total Inventory Value:", totalStockValue);
    }

    console.log("======================================");

    showMenu();
}
// Dashboard
function dashboard() {

    let totalRevenue = 0;
    let totalQuantitySold = 0;
    let totalInventoryValue = 0;
    let lowStockCount = 0;

    sales.forEach(function(sale) {
        totalRevenue += Number(sale.total);
        totalQuantitySold += Number(sale.quantity);
    });

    products.forEach(function(product) {

        totalInventoryValue +=
            Number(product.quantity) *
            Number(product.price);

        if (Number(product.quantity) <= 5) {
            lowStockCount++;
        }
    });

    console.log("\n========== DASHBOARD ==========");

    console.log("Total Products:", products.length);
    console.log("Total Customers:", customers.length);
    console.log("Total Sales:", sales.length);
    console.log("Total Quantity Sold:", totalQuantitySold);
    console.log("Total Revenue:", totalRevenue);
    console.log("Inventory Value:", totalInventoryValue);
    console.log("Low Stock Products:", lowStockCount);

    console.log("================================");

    showMenu();
}

// Start Program
showMenu();
