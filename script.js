// Configuration object for categories
const categories = {
    income: {
        primary: {
            name: "Primary Income Sources",
            fields: [
                { name: "Salary / Wages", type: "number" },
                { name: "Bonuses & Incentives", type: "number" }
            ]
        },
        business: {
            name: "Business & Freelancing",
            fields: [
                { name: "Freelancing Income", type: "number" },
                { name: "Part-time Jobs", type: "number" },
                { name: "Side Hustles", type: "number" }
            ]
        }
    },
    expenses: {
        housing: {
            name: "Housing & Living Expenses",
            fields: [
                { name: "House Rent / Home EMI / PG Rent", type: "number" },
                { name: "Home Insurance", type: "number" },
                { name: "Utilities (Electricity, Water, Gas)", type: "number" },
                { name: "Internet & Phone Bills", type: "number" },
                { name: "Home Maintenance", type: "number" }
            ]
        },
        food: {
            name: "Food & Daily Essentials",
            fields: [
                { name: "Groceries", type: "number" },
                { name: "Dining Out", type: "number" },
                { name: "Snacks & Beverages", type: "number" },
                { name: "Household Items", type: "number" }
            ]
        },
        transport: {
            name: "Transportation & Vehicle Expenses",
            fields: [
                { name: "Vehicle Loan", type: "number" },
                { name: "Fuel", type: "number" },
                { name: "Car Insurance", type: "number" },
                { name: "Vehicle Maintenance", type: "number" },
                { name: "Public Transport", type: "number" }
            ]
        },
        family: {
            name: "Family & Childcare",
            fields: [
                { name: "School Fees", type: "number" },
                { name: "Tuition", type: "number" },
                { name: "Daycare", type: "number" },
                { name: "Child Activities", type: "number" }
            ]
        },
        healthcare: {
            name: "Healthcare & Insurance",
            fields: [
                { name: "Health Insurance", type: "number" },
                { name: "Medical Checkups", type: "number" },
                { name: "Medicines", type: "number" },
                { name: "Dental Care", type: "number" }
            ]
        },
        debt: {
            name: "Debt Repayments & Financial Obligations",
            fields: [
                { name: "Credit Card Bills", type: "number" },
                { name: "Personal Loan EMI", type: "number" },
                { name: "Education Loan EMI", type: "number" },
                { name: "Other Loans", type: "number" }
            ]
        },
        personal: {
            name: "Personal & Lifestyle",
            fields: [
                { name: "Clothing", type: "number" },
                { name: "Salon & Grooming", type: "number" },
                { name: "Gym Membership", type: "number" },
                { name: "Personal Care Products", type: "number" }
            ]
        },
        entertainment: {
            name: "Entertainment & Leisure",
            fields: [
                { name: "Movies & Shows", type: "number" },
                { name: "Vacations", type: "number" },
                { name: "Social Gatherings", type: "number" },
                { name: "Hobbies", type: "number" }
            ]
        },
        miscellaneous: {
            name: "Miscellaneous & Unexpected Expenses",
            fields: [
                { name: "Gifts", type: "number" },
                { name: "Charity", type: "number" },
                { name: "Emergency Fund", type: "number" },
                { name: "Other Expenses", type: "number" }
            ]
        }
    },
    savings: {
        investments: {
            name: "Investments",
            fields: [
                { name: "Retirement Savings", type: "number" },
                { name: "Stock Investments", type: "number" },
                { name: "Mutual Funds", type: "number" },
                { name: "Fixed Deposits", type: "number" }
            ]
        }
    }
};

// Function to create input fields for a category
function createCategoryFields(categoryId, category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category mb-4';
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'category-header flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-lg';
    
    const leftDiv = document.createElement('div');
    leftDiv.className = 'flex items-center';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = categoryId;
    checkbox.className = 'mr-2';
    checkbox.onchange = (e) => {
        e.stopPropagation();
        toggleCategory(`${categoryId}Fields`, checkbox);
    };
    
    const title = document.createElement('strong');
    title.textContent = category.name;
    
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(title);
    
    const rightDiv = document.createElement('div');
    rightDiv.className = 'flex items-center gap-4';
    
    const totalSpan = document.createElement('span');
    totalSpan.id = `${categoryId}Total`;
    totalSpan.className = 'text-sm text-gray-600';
    totalSpan.textContent = '₹0.00';
    
    const toggleIcon = document.createElement('span');
    toggleIcon.className = 'toggle-icon text-gray-400';
    toggleIcon.innerHTML = '▼';
    
    rightDiv.appendChild(totalSpan);
    rightDiv.appendChild(toggleIcon);
    
    headerDiv.appendChild(leftDiv);
    headerDiv.appendChild(rightDiv);
    
    const fieldsDiv = document.createElement('div');
    fieldsDiv.id = `${categoryId}Fields`;
    fieldsDiv.className = 'hidden mt-2 space-y-2 pl-6';
    
    category.fields.forEach(field => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        
        // Create header div for label and select
        const headerDiv = document.createElement('div');
        headerDiv.className = 'input-group-header';
        
        const label = document.createElement('label');
        label.textContent = field.name;
        
        const select = document.createElement('select');
        select.id = `${field.name}Type`;
        select.className = 'border p-1 rounded';
        select.onchange = calculateBudget;
        
        ['Monthly', 'Yearly'].forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase();
            opt.textContent = option;
            select.appendChild(opt);
        });
        
        headerDiv.appendChild(label);
        headerDiv.appendChild(select);
        
        // Create input field
        const input = document.createElement('input');
        input.type = 'number';
        input.id = field.name;
        input.value = '0';
        input.disabled = true;
        input.className = 'border p-1 rounded';
        
        // Handle focus event
        input.onfocus = function() {
            if (this.value === '0') {
                this.value = '';
            }
        };
        
        // Handle blur event
        input.onblur = function() {
            if (this.value === '') {
                this.value = '0';
                calculateBudget();
            }
        };
        
        // Handle input event
        input.oninput = function() {
            // Remove leading zeros
            if (this.value.length > 1 && this.value[0] === '0') {
                this.value = this.value.replace(/^0+/, '');
            }
            // Ensure value is not negative
            if (this.value < 0) {
                this.value = '0';
            }
            calculateBudget();
        };
        
        inputGroup.appendChild(headerDiv);
        inputGroup.appendChild(input);
        fieldsDiv.appendChild(inputGroup);
    });
    
    // Add click handler for the header
    headerDiv.onclick = (e) => {
        if (e.target !== checkbox) {
            toggleCategoryVisibility(`${categoryId}Fields`, toggleIcon);
        }
    };
    
    categoryDiv.appendChild(headerDiv);
    categoryDiv.appendChild(fieldsDiv);
    
    return categoryDiv;
}

// Function to toggle category visibility
function toggleCategoryVisibility(categoryId, toggleIcon) {
    const fieldsDiv = document.getElementById(categoryId);
    const isHidden = fieldsDiv.classList.contains('hidden');
    
    fieldsDiv.classList.toggle('hidden');
    toggleIcon.textContent = isHidden ? '▼' : '▶';
}

// Function to toggle category enabled state
function toggleCategory(categoryId, checkbox) {
    const fieldsDiv = document.getElementById(categoryId);
    const inputs = fieldsDiv.querySelectorAll('input[type="number"], select');
    
    if (checkbox.checked) {
        fieldsDiv.classList.remove('hidden');
        inputs.forEach(input => {
            input.removeAttribute('disabled');
            if (input.type === 'number') {
                input.value = '0';
            }
        });
    } else {
        fieldsDiv.classList.add('hidden');
        inputs.forEach(input => {
            input.setAttribute('disabled', true);
            if (input.type === 'number') {
                input.value = '0';
            }
        });
        calculateBudget();
    }
}

// Function to calculate category total
function calculateCategoryTotal(categoryId, category) {
    let total = 0;
    category.fields.forEach(field => {
        total += getValue(field.name, `${field.name}Type`);
    });
    return total;
}

// Function to get value from input field
function getValue(id, typeId) {
    let value = parseFloat(document.getElementById(id).value) || 0;
    let type = document.getElementById(typeId).value;
    return type === "yearly" ? value / 12 : value;
}

// Function to calculate total budget
function calculateBudget() {
    let monthlyIncome = 0;
    let monthlyExpenses = 0;
    let monthlySavings = 0;
    
    // Calculate income
    Object.entries(categories.income).forEach(([key, category]) => {
        const categoryTotal = calculateCategoryTotal(key, category);
        monthlyIncome += categoryTotal;
        document.getElementById(`${key}Total`).textContent = `₹${formatCurrency(categoryTotal)}`;
    });
    
    // Calculate expenses (excluding savings)
    Object.entries(categories.expenses).forEach(([key, category]) => {
        const categoryTotal = calculateCategoryTotal(key, category);
        monthlyExpenses += categoryTotal;
        document.getElementById(`${key}Total`).textContent = `₹${formatCurrency(categoryTotal)}`;
    });
    
    // Calculate savings
    Object.entries(categories.savings).forEach(([key, category]) => {
        const categoryTotal = calculateCategoryTotal(key, category);
        monthlySavings += categoryTotal;
        document.getElementById(`${key}Total`).textContent = `₹${formatCurrency(categoryTotal)}`;
    });
    
    let yearlyIncome = monthlyIncome * 12;
    let yearlyExpenses = monthlyExpenses * 12;
    let yearlySavings = monthlySavings * 12;
    let monthlyBalance = monthlyIncome - monthlyExpenses - monthlySavings;
    let yearlyBalance = yearlyIncome - yearlyExpenses - yearlySavings;
    
    // Update display with proper formatting
    function formatCurrency(value) {
        return value.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });
    }
    
    document.getElementById('monthlyIncome').textContent = formatCurrency(monthlyIncome);
    document.getElementById('yearlyIncome').textContent = formatCurrency(yearlyIncome);
    document.getElementById('monthlyExpenses').textContent = formatCurrency(monthlyExpenses);
    document.getElementById('yearlyExpenses').textContent = formatCurrency(yearlyExpenses);
    document.getElementById('monthlySavings').textContent = formatCurrency(monthlySavings);
    document.getElementById('yearlySavings').textContent = formatCurrency(yearlySavings);
    document.getElementById('monthlyBalance').textContent = formatCurrency(monthlyBalance);
    document.getElementById('yearlyBalance').textContent = formatCurrency(yearlyBalance);
}

// Initialize the calculator
document.addEventListener('DOMContentLoaded', () => {
    const incomeSection = document.querySelector('.income');
    const expensesSection = document.querySelector('.expenses');
    const savingsSection = document.querySelector('.savings');
    
    // Add income categories
    Object.entries(categories.income).forEach(([key, category]) => {
        incomeSection.appendChild(createCategoryFields(key, category));
    });
    
    // Add expense categories
    Object.entries(categories.expenses).forEach(([key, category]) => {
        expensesSection.appendChild(createCategoryFields(key, category));
    });
    
    // Add savings categories
    Object.entries(categories.savings).forEach(([key, category]) => {
        savingsSection.appendChild(createCategoryFields(key, category));
    });
}); 