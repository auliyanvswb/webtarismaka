// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Toggle folder content in repository
function toggleFolder(folderId) {
    const folderContent = document.getElementById(folderId);
    const folderItem = event.currentTarget;
    
    if (folderContent) {
        folderContent.classList.toggle('active');
        folderItem.classList.toggle('active');
    }
}

// Knowledge Sharing tabs
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    event.currentTarget.classList.add('active');
}

// Calendar navigation
let currentMonth = 0; // 0 for January 2026
const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
    }
    updateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
    }
    updateCalendar();
}

function updateCalendar() {
    const monthElement = document.getElementById('currentMonth');
    if (monthElement) {
        monthElement.textContent = `${months[currentMonth]} 2026`;
    }
    // In a real application, you would regenerate the calendar grid here
}

// Video Modal Functions
function openVideoModal(videoTitle, videoSource, videoType = 'local') {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('videoModalTitle');
    const playerContainer = document.getElementById('videoPlayerContainer');
    
    modalTitle.textContent = videoTitle;
    
    // Clear previous content
    playerContainer.innerHTML = '';
    
    if (videoType === 'youtube') {
        // YouTube embed
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoSource}?autoplay=1`;
        iframe.width = '100%';
        iframe.height = '500';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        playerContainer.appendChild(iframe);
    } else {
        // Local video or URL
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = true;
        video.style.width = '100%';
        video.style.borderRadius = '10px';
        
        const source = document.createElement('source');
        source.src = videoSource;
        source.type = 'video/mp4';
        
        video.appendChild(source);
        playerContainer.appendChild(video);
        
        // Add error message if video fails to load
        video.onerror = function() {
            playerContainer.innerHTML = `
                <div style="text-align: center; padding: 50px; color: #666;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i>
                    <p style="font-size: 18px; margin-bottom: 10px;">Video tidak dapat dimuat</p>
                    <p style="font-size: 14px;">File video mungkin tidak tersedia atau path salah</p>
                    <p style="font-size: 12px; margin-top: 20px;">Path: ${videoSource}</p>
                </div>
            `;
        };
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const playerContainer = document.getElementById('videoPlayerContainer');
    
    modal.style.display = 'none';
    playerContainer.innerHTML = ''; // Stop video by removing it
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideoModal();
    }
}

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeVideoModal();
    }
});

// Video player simulation (kept for backward compatibility)
function playVideo(videoName) {
    // Try to open with a demo YouTube video
    openVideoModal(videoName, 'dQw4w9WgXcQ', 'youtube');
}

// Download file simulation
function downloadFile(fileName) {
    alert(`Mengunduh file: ${fileName}`);
    // In a real application, this would trigger actual file download
}

// Like/Comment interaction
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers for like buttons
    const likeButtons = document.querySelectorAll('.post-footer .btn-icon:first-child');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countElement = this.textContent.trim().split(' ')[1];
            const currentCount = parseInt(countElement);
            this.innerHTML = `<i class="fas fa-thumbs-up"></i> ${currentCount + 1}`;
            this.style.color = 'var(--primary-color)';
        });
    });

    // Add smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Highlight current section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-right a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Add hover effect to calendar days
    const calendarDays = document.querySelectorAll('.calendar-day:not(.empty)');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            if (!this.classList.contains('today')) {
                alert(`Tanggal ${this.textContent} dipilih`);
            }
        });
    });

    // Repository folder animations
    const folderItems = document.querySelectorAll('.folder-item');
    folderItems.forEach(item => {
        item.addEventListener('click', function() {
            const icon = this.querySelector('.toggle-icon');
            if (icon) {
                icon.style.transform = icon.style.transform === 'rotate(180deg)' 
                    ? 'rotate(0deg)' 
                    : 'rotate(180deg)';
            }
        });
    });

    // ========================================
    // 📺 VIDEO DASHBOARD - GANTI VIDEO DI SINI!
    // ========================================
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoName = this.querySelector('span').textContent;
            
            // 🎬 CARA PAKAI:
            // Untuk YouTube: openVideoModal('Judul', 'VIDEO_ID_YOUTUBE', 'youtube')
            // Untuk Video Lokal: openVideoModal('Judul', 'assets/videos/namafile.mp4', 'local')
            
            if (videoName.includes('Wonderland')) {
                // ⬇️ GANTI VIDEO ID YOUTUBE DI SINI untuk video Saman
                openVideoModal(videoName, 'assets/videos/auliyanari.mp4', 'local');
                
                // ⬇️ ATAU pakai video lokal (hapus baris atas, uncomment baris bawah):
                // openVideoModal(videoName, 'assets/videos/tari-saman.mp4', 'local');
                
            } else if (videoName.includes('Nengganjen')) {
                // ⬇️ GANTI VIDEO ID YOUTUBE DI SINI untuk video Kreasi
                //openVideoModal(videoName, 'jNQXAC9IVRw', 'youtube');
                
                // ⬇️ ATAU pakai video lokal (hapus baris atas, uncomment baris bawah):
                openVideoModal(videoName, 'assets/videos/nengganjen.mp4', 'local');
                
            } else {
                // ⬇️ Default untuk video lainnya - GANTI PATH VIDEO LOKAL DI SINI
                openVideoModal(videoName, 'assets/videos/sample.mp4', 'local');
            }
        });
    });

    // ========================================
    // 📁 VIDEO REPOSITORY - GANTI VIDEO DI SINI!
    // ========================================
    const playButtons = document.querySelectorAll('.repo-content .btn-small');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const fileName = this.parentElement.querySelector('span').textContent;
            const buttonText = this.textContent;
            
            if (buttonText === 'Play') {
                // 🎬 CARA PAKAI VIDEO:
                // YouTube: openVideoModal('Judul', 'VIDEO_ID', 'youtube')
                // Lokal: openVideoModal('Judul', 'assets/videos/namafile.mp4', 'local')
                
                if (fileName.includes('Pembukaan')) {
                    // ⬇️ VIDEO PART 1 PEMBUKAAN - Ganti ID YouTube atau path lokal
                    openVideoModal(fileName, 'assets/videos/auliyanari.mp4', 'local');
                    // openVideoModal(fileName, 'assets/videos/pembukaan.mp4', 'local'); ← uncomment untuk lokal
                    
                } else if (fileName.includes('Inti')) {
                    // ⬇️ VIDEO PART 2 INTI - Ganti ID YouTube atau path lokal
                    openVideoModal(fileName, 'jNQXAC9IVRw', 'youtube');
                    // openVideoModal(fileName, 'assets/videos/inti.mp4', 'local'); // ← uncomment untuk lokal
                    
                } else if (fileName.includes('Penutup')) {
                    // ⬇️ VIDEO PART 3 PENUTUP - Ganti ID YouTube atau path lokal
                    openVideoModal(fileName, '9bZkp7q19f0', 'youtube');
                    // openVideoModal(fileName, 'assets/videos/penutup.mp4', 'local'); // ← uncomment untuk lokal
                    
                } else if (fileName.includes('Full Version')) {
                    // ⬇️ VIDEO FULL VERSION - Ganti ID YouTube atau path lokal
                    openVideoModal(fileName, 'kJQP7kiw5Fk', 'youtube');
                    // openVideoModal(fileName, 'assets/videos/full-version.mp4', 'local'); // ← uncomment untuk lokal
                    
                } else if (fileName.includes('Tutorial Slow Motion')) {
                    // ⬇️ VIDEO TUTORIAL - Ganti ID YouTube atau path lokal
                    openVideoModal(fileName, 'dQw4w9WgXcQ', 'youtube');
                    // openVideoModal(fileName, 'assets/videos/tutorial.mp4', 'local'); // ← uncomment untuk lokal
                    
                } else {
                    // ⬇️ VIDEO LAINNYA - Otomatis pakai nama file
                    openVideoModal(fileName, `assets/videos/${fileName}`, 'local');
                }
            } else if (buttonText === 'Download') {
                alert(`Mengunduh file: ${fileName}`);
            } else if (buttonText === 'View') {
                alert(`Membuka file: ${fileName}`);
            }
        });
    });

    // Profile edit button
    const editButton = document.querySelector('.btn-edit');
    if (editButton) {
        editButton.addEventListener('click', function() {
            alert('Fitur edit profil akan tersedia dalam versi lengkap aplikasi.');
        });
    }

    // Add new knowledge sharing post button
    const addPostButton = document.querySelector('.knowledge-section .btn-primary');
    if (addPostButton) {
        addPostButton.addEventListener('click', function() {
            alert('Form untuk membagikan pengalaman akan muncul di sini.');
        });
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards when page loads
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.dashboard-card, .about-card, .repo-card, .post-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});

// Search functionality (for future implementation)
function searchRepository(query) {
    console.log('Searching for:', query);
    // Implementation for search functionality
}

// Export data functionality (for future implementation)
function exportData(format) {
    console.log('Exporting data as:', format);
    // Implementation for export functionality
}

// Notification system (for future implementation)
function showNotification(message, type = 'info') {
    console.log(`${type}: ${message}`);
    // Implementation for notification system
}

// Initialize page
window.addEventListener('load', function() {
    console.log('Knowledge Management System - Komunitas Tari SMAKA loaded successfully');
    
    // Set current date
    const today = new Date();
    const todayElement = document.querySelector('.calendar-day.today');
    if (todayElement && today.getDate() !== 1) {
        todayElement.classList.remove('today');
        const correctDay = document.querySelectorAll('.calendar-day')[today.getDate() + 2];
        if (correctDay) {
            correctDay.classList.add('today');
        }
    }
});

// Handle window resize for responsive behavior
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Window resized, adjusting layout...');
        // Add any necessary responsive adjustments here
    }, 250);
});

// Prevent default behavior for demo buttons
document.addEventListener('DOMContentLoaded', function() {
    const demoButtons = document.querySelectorAll('button:not([onclick])');
    demoButtons.forEach(button => {
        if (!button.classList.contains('tab-button') && 
            !button.classList.contains('btn-icon') && 
            !button.classList.contains('btn-small')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Button clicked:', this.textContent);
            });
        }
    });
});
