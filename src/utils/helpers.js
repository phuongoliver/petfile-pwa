const calculateAge = (dob) => {
    if (!dob) return "New";
    try {
        const birthDate = new Date(dob);
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();

        if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
            years--;
            months = (months + 12) % 12;
        }
        if (years > 0) return `${years} years`;
        if (months > 0) return `${months} months`;
        const days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
        if (days > 0) return `${days} days`;
        return "Newborn";
    } catch (e) { return "New"; }
};

module.exports = { calculateAge };
