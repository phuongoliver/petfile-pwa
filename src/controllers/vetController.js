exports.getVets = (req, res) => {
    // In a real app, this would come from a database with geolocation
    const mockVets = [
        { id: 101, name: "Dr. Nguyen An", clinic: "Happy Paws Clinic", dist: "1.2 km", status: "online", saved: true, img: "👨‍⚕️" },
        { id: 102, name: "Dr. Sarah Smith", clinic: "City Vet Center", dist: "3.5 km", status: "offline", saved: true, img: "👩‍⚕️" },
        { id: 103, name: "Dr. Tran Minh", clinic: "PetCare Saigon", dist: "0.8 km", status: "online", saved: false, img: "👨‍⚕️" },
        { id: 104, name: "Dr. Le Thi Mai", clinic: "Animal ER", dist: "5.0 km", status: "busy", saved: false, img: "👩‍⚕️" },
        { id: 105, name: "Dr. John Doe", clinic: "International Vet", dist: "2.1 km", status: "online", saved: false, img: "👨‍⚕️" }
    ];
    res.json(mockVets);
};
