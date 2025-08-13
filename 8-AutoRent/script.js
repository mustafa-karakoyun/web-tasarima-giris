// Araç verileri - assets klasöründeki görselleri kullanarak
const vehicles = [
    {
        id: 1,
        name: "BMW 3 Serisi",
        category: "Lüks",
        image: "assets/range-1.jpg",
        price: 850,
        specs: {
            transmission: "Otomatik",
            fuel: "Benzin",
            seats: "5",
            year: "2023"
        },
        status: "available",
        badge: "Popüler"
    },
    {
        id: 2,
        name: "Mercedes C-Class",
        category: "Lüks",
        image: "assets/range-2.jpg",
        price: 920,
        specs: {
            transmission: "Otomatik",
            fuel: "Benzin",
            seats: "5",
            year: "2023"
        },
        status: "available",
        badge: "Yeni"
    },
    {
        id: 3,
        name: "Audi A4",
        category: "Lüks",
        image: "assets/range-3.jpg",
        price: 780,
        specs: {
            transmission: "Otomatik",
            fuel: "Dizel",
            seats: "5",
            year: "2022"
        },
        status: "available"
    },
    {
        id: 4,
        name: "Volkswagen Golf",
        category: "Ekonomik",
        image: "assets/range-4.jpg",
        price: 450,
        specs: {
            transmission: "Manuel",
            fuel: "Benzin",
            seats: "5",
            year: "2022"
        },
        status: "available"
    },
    {
        id: 5,
        name: "Toyota Corolla",
        category: "Ekonomik",
        image: "assets/select-1.png",
        price: 420,
        specs: {
            transmission: "Otomatik",
            fuel: "Hibrit",
            seats: "5",
            year: "2023"
        },
        status: "available",
        badge: "Eko"
    },
    {
        id: 6,
        name: "Honda Civic",
        category: "Ekonomik",
        image: "assets/select-2.png",
        price: 480,
        specs: {
            transmission: "Otomatik",
            fuel: "Benzin",
            seats: "5",
            year: "2022"
        },
        status: "available"
    },
    {
        id: 7,
        name: "Ford Focus",
        category: "Ekonomik",
        image: "assets/select-3.png",
        price: 400,
        specs: {
            transmission: "Manuel",
            fuel: "Dizel",
            seats: "5",
            year: "2021"
        },
        status: "maintenance",
        badge: "Bakımda"
    },
    {
        id: 8,
        name: "Hyundai i30",
        category: "Ekonomik",
        image: "assets/select-4.png",
        price: 380,
        specs: {
            transmission: "Otomatik",
            fuel: "Benzin",
            seats: "5",
            year: "2022"
        },
        status: "available"
    },
    {
        id: 9,
        name: "BMW X3",
        category: "SUV",
        image: "assets/select-5.png",
        price: 1100,
        specs: {
            transmission: "Otomatik",
            fuel: "Benzin",
            seats: "5",
            year: "2023"
        },
        status: "available",
        badge: "Premium"
    },
    {
        id: 10,
        name: "Mercedes GLC",
        category: "SUV",
        image: "assets/select-6.png",
        price: 1200,
        specs: {
            transmission: "Otomatik",
            fuel: "Dizel",
            seats: "5",
            year: "2023"
        },
        status: "available"
    },
    {
        id: 11,
        name: "Audi Q5",
        category: "SUV",
        image: "assets/select-7.png",
        price: 1150,
        specs: {
            transmission: "Otomatik",
            fuel: "Benzin",
            seats: "5",
            year: "2022"
        },
        status: "available"
    },
    {
        id: 12,
        name: "Volkswagen Tiguan",
        category: "SUV",
        image: "assets/cars.jpeg",
        price: 750,
        specs: {
            transmission: "Otomatik",
            fuel: "Dizel",
            seats: "5",
            year: "2022"
        },
        status: "available"
    }
];

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    loadVehicles();
    setupEventListeners();
    setupAnimations();
    setupNavbarScroll();
});

// Araçları yükle
function loadVehicles() {
    const container = document.getElementById('vehiclesContainer');
    if (!container) return;

    vehicles.forEach(vehicle => {
        const vehicleCard = createVehicleCard(vehicle);
        container.appendChild(vehicleCard);
    });
}

// Araç kartı oluştur
function createVehicleCard(vehicle) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    const statusClass = vehicle.status === 'available' ? 'status-available' : 
                       vehicle.status === 'maintenance' ? 'status-maintenance' : 'status-unavailable';
    
    const badgeHtml = vehicle.badge ? `<div class="vehicle-badge">${vehicle.badge}</div>` : '';
    
    col.innerHTML = `
        <div class="vehicle-card hover-lift">
            <div class="vehicle-image" style="background-image: url('${vehicle.image}')">
                ${badgeHtml}
            </div>
            <div class="vehicle-info">
                <h5 class="vehicle-title">${vehicle.name}</h5>
                <div class="vehicle-specs">
                    <span><i class="fas fa-cog me-1"></i>${vehicle.specs.transmission}</span>
                    <span><i class="fas fa-gas-pump me-1"></i>${vehicle.specs.fuel}</span>
                    <span><i class="fas fa-users me-1"></i>${vehicle.specs.seats}</span>
                    <span><i class="fas fa-calendar me-1"></i>${vehicle.specs.year}</span>
                </div>
                <div class="vehicle-price">
                    ₺${vehicle.price}<small>/gün</small>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary flex-fill" onclick="bookVehicle('${vehicle.name}')">
                        <i class="fas fa-calendar-plus me-2"></i>Rezervasyon
                    </button>
                    <button class="btn btn-outline-primary" onclick="showVehicleDetails(${vehicle.id})">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Event listener'ları ayarla
function setupEventListeners() {
    // Hızlı rezervasyon formu
    const quickBookingForm = document.getElementById('quickBookingForm');
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchVehicles();
        });
    }

    // İletişim formu
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm();
        });
    }

    // Smooth scrolling için link'leri ayarla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animasyonları ayarla
function setupAnimations() {
    // Intersection Observer ile scroll animasyonları
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Animasyon uygulanacak elementler
    document.querySelectorAll('.feature-card, .vehicle-card, .service-card').forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll efekti
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Araç rezervasyonu
function bookVehicle(vehicleName) {
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    document.getElementById('selectedVehicle').value = vehicleName;
    modal.show();
}

// Araç detaylarını göster
function showVehicleDetails(vehicleId) {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    const detailsHtml = `
        <div class="modal-header">
            <h5 class="modal-title">${vehicle.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-6">
                    <img src="${vehicle.image}" alt="${vehicle.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-6">
                    <h6>Özellikler:</h6>
                    <ul class="list-unstyled">
                        <li><i class="fas fa-cog me-2"></i>Vites: ${vehicle.specs.transmission}</li>
                        <li><i class="fas fa-gas-pump me-2"></i>Yakıt: ${vehicle.specs.fuel}</li>
                        <li><i class="fas fa-users me-2"></i>Koltuk: ${vehicle.specs.seats}</li>
                        <li><i class="fas fa-calendar me-2"></i>Yıl: ${vehicle.specs.year}</li>
                    </ul>
                    <div class="mt-3">
                        <h4 class="text-primary">₺${vehicle.price}/gün</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
            <button type="button" class="btn btn-primary" onclick="bookVehicle('${vehicle.name}')">
                Rezervasyon Yap
            </button>
        </div>
    `;

    const modal = document.getElementById('bookingModal');
    modal.querySelector('.modal-content').innerHTML = detailsHtml;
    new bootstrap.Modal(modal).show();
}

// Araç arama
function searchVehicles() {
    const form = document.getElementById('quickBookingForm');
    const formData = new FormData(form);
    
    // Gerçek uygulamada burada API çağrısı yapılır
    showNotification('Araç arama işlemi başlatıldı...', 'info');
    
    // Simüle edilmiş arama sonucu
    setTimeout(() => {
        showNotification('Arama tamamlandı! Uygun araçlar listelendi.', 'success');
        document.getElementById('vehicles').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Rezervasyon gönder
function submitBooking() {
    const form = document.getElementById('bookingForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const submitBtn = document.querySelector('#bookingModal .btn-primary');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="loading"></span> Gönderiliyor...';
    submitBtn.disabled = true;

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
        showNotification('Rezervasyonunuz başarıyla alındı! En kısa sürede size dönüş yapacağız.', 'success');
        bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
        form.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// İletişim formu gönder
function submitContactForm() {
    const form = document.getElementById('contactForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<span class="loading"></span> Gönderiliyor...';
    submitBtn.disabled = true;

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
        showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
        form.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Bildirim göster
function showNotification(message, type = 'info') {
    // Bootstrap toast veya custom notification
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // 5 saniye sonra otomatik kaldır
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Fiyat hesaplama
function calculatePrice(basePrice, days) {
    let discount = 0;
    if (days >= 7) discount = 0.1;
    if (days >= 14) discount = 0.15;
    if (days >= 30) discount = 0.2;
    
    return Math.round(basePrice * days * (1 - discount));
}

// Tarih formatla
function formatDate(date) {
    return new Date(date).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Sayfa yüklendiğinde tarih alanlarını ayarla
window.addEventListener('load', function() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateInputs = document.querySelectorAll('input[type="datetime-local"]');
    dateInputs.forEach((input, index) => {
        if (index === 0) {
            input.value = now.toISOString().slice(0, 16);
        } else {
            input.value = tomorrow.toISOString().slice(0, 16);
        }
    });
});

// Global fonksiyonlar
window.bookVehicle = bookVehicle;
window.showVehicleDetails = showVehicleDetails;
window.submitBooking = submitBooking;
