// Configuration object for all categories and their fields
const categories = {
    primaryIncome: {
        title: 'Primary Income Sources',
        fields: [
            { id: 'salary', label: 'Salary/Wages' },
            { id: 'bonuses', label: 'Bonuses & Incentives' },
            { id: 'overtime', label: 'Overtime Pay' },
            { id: 'commission', label: 'Commission' }
        ]
    },
    businessIncome: {
        title: 'Business & Freelancing',
        fields: [
            { id: 'businessProfits', label: 'Business Profits' },
            { id: 'freelancing', label: 'Freelancing Income' },
            { id: 'partTime', label: 'Part-time Jobs' },
            { id: 'sideHustles', label: 'Side Hustles' }
        ]
    },
    housingExpenses: {
        title: 'Housing & Living Expenses',
        fields: [
            { id: 'rentMortgage', label: 'Rent / Mortgage' },
            { id: 'propertyTax', label: 'Property Tax' },
            { id: 'homeInsurance', label: 'Home Insurance' },
            { id: 'electricity', label: 'Electricity Bill' },
            { id: 'waterBill', label: 'Water Bill' },
            { id: 'gasBill', label: 'Gas Bill' },
            { id: 'internet', label: 'Internet & Wi-Fi' },
            { id: 'streaming', label: 'Cable / Streaming Services' },
            { id: 'maintenance', label: 'Home Maintenance & Repairs' },
            { id: 'security', label: 'Home Security Services' }
        ]
    },
    foodExpenses: {
        title: 'Food & Daily Essentials',
        fields: [
            { id: 'groceries', label: 'Groceries' },
            { id: 'dining', label: 'Dining Out & Takeout' },
            { id: 'snacks', label: 'Snacks & Beverages' },
            { id: 'specialOccasions', label: 'Special Occasions' }
        ]
    },
    transportExpenses: {
        title: 'Transportation & Vehicle Expenses',
        fields: [
            { id: 'carLoan', label: 'Car Loan / Lease Payment' },
            { id: 'fuel', label: 'Fuel / Petrol / Diesel' },
            { id: 'carInsurance', label: 'Car Insurance' },
            { id: 'carMaintenance', label: 'Car Maintenance & Repairs' },
            { id: 'publicTransport', label: 'Public Transport' },
            { id: 'rideSharing', label: 'Ride-Sharing' },
            { id: 'parking', label: 'Parking Fees & Tolls' }
        ]
    },
    familyExpenses: {
        title: 'Family & Childcare',
        fields: [
            { id: 'schoolFees', label: 'Children\'s School Fees' },
            { id: 'tuition', label: 'Tuition & Coaching Classes' },
            { id: 'daycare', label: 'Daycare / Nanny Services' },
            { id: 'kidsClothing', label: 'Kids\' Clothing & Accessories' },
            { id: 'kidsEntertainment', label: 'Toys & Entertainment for Kids' }
        ]
    },
    healthcareExpenses: {
        title: 'Healthcare & Insurance',
        fields: [
            { id: 'healthInsurance', label: 'Health Insurance Premiums' },
            { id: 'lifeInsurance', label: 'Life Insurance Premiums' },
            { id: 'medicalCheckups', label: 'Medical Checkups & Consultations' },
            { id: 'medicines', label: 'Medicines & Supplements' },
            { id: 'emergencyMedical', label: 'Emergency Medical Expenses' },
            { id: 'dentalVision', label: 'Dental & Vision Care' }
        ]
    },
    debtExpenses: {
        title: 'Debt Repayments & Financial Obligations',
        fields: [
            { id: 'creditCard', label: 'Credit Card Bills' },
            { id: 'personalLoan', label: 'Personal Loan EMI' },
            { id: 'studentLoan', label: 'Student Loan EMI' }
        ]
    },
    savingsExpenses: {
        title: 'Savings & Investments',
        fields: [
            { id: 'retirement', label: 'Retirement Savings' },
            { id: 'investments', label: 'Stock / Mutual Fund Investments' },
            { id: 'emergencyFund', label: 'Emergency Fund Savings' },
            { id: 'fixedDeposits', label: 'Fixed Deposits / Recurring Deposits' }
        ]
    },
    personalExpenses: {
        title: 'Personal & Lifestyle',
        fields: [
            { id: 'clothing', label: 'Clothing & Footwear' },
            { id: 'grooming', label: 'Salon & Grooming' },
            { id: 'fitness', label: 'Gym Membership / Yoga Classes' },
            { id: 'hobbies', label: 'Hobbies & Subscriptions' }
        ]
    },
    entertainmentExpenses: {
        title: 'Entertainment & Leisure',
        fields: [
            { id: 'entertainment', label: 'Movies & Concerts' },
            { id: 'travel', label: 'Vacations & Travel' },
            { id: 'social', label: 'Social Gatherings & Outings' },
            { id: 'tech', label: 'Gaming, Gadgets & Tech Upgrades' }
        ]
    },
    miscExpenses: {
        title: 'Miscellaneous & Unexpected Expenses',
        fields: [
            { id: 'gifts', label: 'Gifts for Family & Friends' },
            { id: 'charity', label: 'Charity & Donations' },
            { id: 'petCare', label: 'Pet Care' },
            { id: 'unexpected', label: 'Unexpected Expenses' }
        ]
    }
};

// Function to create input fields for a category
function createCategoryFields(categoryId, category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category mb-4';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = categoryId;
    checkbox.onchange = () => toggleCategory(`${categoryId}Fields`, checkbox);
    
    const title = document.createElement('strong');
    title.textContent = category.title;
    
    const fieldsDiv = document.createElement('div');
    fieldsDiv.id = `${categoryId}Fields`;
    fieldsDiv.className = 'hidden mt-2 space-y-2';
    
    category.fields.forEach(field => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group flex gap-2';
        
        const label = document.createElement('label');
        label.textContent = field.label;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.id = field.id;
        input.value = '0';
        input.oninput = calculateBudget;
        input.disabled = true;
        input.className = 'border p-1 rounded';
        
        const select = document.createElement('select');
        select.id = `${field.id}Type`;
        select.className = 'border p-1 rounded';
        select.onchange = calculateBudget;
        
        ['Monthly', 'Yearly'].forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase();
            opt.textContent = option;
            select.appendChild(opt);
        });
        
        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        inputGroup.appendChild(select);
        fieldsDiv.appendChild(inputGroup);
    });
    
    categoryDiv.appendChild(checkbox);
    categoryDiv.appendChild(title);
    categoryDiv.appendChild(fieldsDiv);
    
    return categoryDiv;
}

// Function to toggle category visibility
function toggleCategory(categoryId, checkbox) {
    const fieldsDiv = document.getElementById(categoryId);
    const inputs = fieldsDiv.querySelectorAll('input[type="number"], select');
    
    if (checkbox.checked) {
        fieldsDiv.classList.remove('hidden');
        inputs.forEach(input => input.removeAttribute('disabled'));
    } else {
        fieldsDiv.classList.add('hidden');
        inputs.forEach(input => {
            input.setAttribute('disabled', true);
            input.value = 0;
        });
        calculateBudget();
    }
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
    
    // Calculate income
    ['primaryIncome', 'businessIncome'].forEach(categoryId => {
        categories[categoryId].fields.forEach(field => {
            monthlyIncome += getValue(field.id, `${field.id}Type`);
        });
    });
    
    // Calculate expenses
    Object.keys(categories).forEach(categoryId => {
        if (categoryId !== 'primaryIncome' && categoryId !== 'businessIncome') {
            categories[categoryId].fields.forEach(field => {
                monthlyExpenses += getValue(field.id, `${field.id}Type`);
            });
        }
    });
    
    let yearlyIncome = monthlyIncome * 12;
    let yearlyExpenses = monthlyExpenses * 12;
    let monthlyBalance = monthlyIncome - monthlyExpenses;
    let yearlyBalance = yearlyIncome - yearlyExpenses;
    
    // Update display
    document.getElementById('monthlyIncome').textContent = monthlyIncome.toFixed(2);
    document.getElementById('yearlyIncome').textContent = yearlyIncome.toFixed(2);
    document.getElementById('monthlyExpenses').textContent = monthlyExpenses.toFixed(2);
    document.getElementById('yearlyExpenses').textContent = yearlyExpenses.toFixed(2);
    document.getElementById('monthlyBalance').textContent = monthlyBalance.toFixed(2);
    document.getElementById('yearlyBalance').textContent = yearlyBalance.toFixed(2);
}

// Initialize the calculator
document.addEventListener('DOMContentLoaded', () => {
    const incomeSection = document.querySelector('.income');
    const expensesSection = document.querySelector('.expenses');
    
    // Add income categories
    ['primaryIncome', 'businessIncome'].forEach(categoryId => {
        incomeSection.appendChild(createCategoryFields(categoryId, categories[categoryId]));
    });
    
    // Add expense categories
    Object.keys(categories).forEach(categoryId => {
        if (categoryId !== 'primaryIncome' && categoryId !== 'businessIncome') {
            expensesSection.appendChild(createCategoryFields(categoryId, categories[categoryId]));
        }
    });
}); 