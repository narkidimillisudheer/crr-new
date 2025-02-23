const calculateInactiveMonths = (transactions) => {
    const today = new Date();
    let inactiveMonths = 0;

    for (let i = 11; i >= 0; i--) {
        const checkMonth = new Date(today);
        checkMonth.setMonth(today.getMonth() - i);

        const hasTransaction = transactions.some((txn) => {
            const txnDate = new Date(txn.date);
            return txnDate.getMonth() === checkMonth.getMonth() && txnDate.getFullYear() === checkMonth.getFullYear();
        });

        if (!hasTransaction) {
            inactiveMonths++;
        }
    }
    return inactiveMonths;
};

const calculateMonthsAsCustomer = (joiningDate) => {
    const today = new Date();
    const joinDate = new Date(joiningDate);
    return (today.getFullYear() - joinDate.getFullYear()) * 12 + (today.getMonth() - joinDate.getMonth());
};



module.exports = { calculateInactiveMonths, calculateMonthsAsCustomer };    