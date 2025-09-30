// สร้างไฟล์ script.js ใหม่
document.addEventListener('DOMContentLoaded', function() {
    // ฟังก์ชันสำหรับการเปลี่ยนตารางเรียน
    const gradeBtns = document.querySelectorAll('.grade-btn');
    const timetables = document.querySelectorAll('.timetable-content');
    
    gradeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // ลบ active class จากปุ่มทั้งหมด
            gradeBtns.forEach(b => b.classList.remove('active'));
            timetables.forEach(t => t.classList.remove('active'));
            
            // เพิ่ม active class ให้ปุ่มที่คลิก
            this.classList.add('active');
            
            // แสดงตารางเรียนที่ตรงกับชั้นที่เลือก
            const grade = this.getAttribute('data-grade');
            const targetTable = document.getElementById(`timetable-${grade}`);
            if (targetTable) {
                targetTable.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling สำหรับ navigation
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
// เพิ่มใน script.js
document.addEventListener('DOMContentLoaded', function() {
    // ฟังก์ชันสำหรับการดาวน์โหลดตารางเรียน
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const grade = this.getAttribute('data-grade');
            const room = this.getAttribute('data-room');
            
            // เพิ่มเอฟเฟกต์การโหลด
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="download-icon">⏳</i> กำลังดาวน์โหลด...';
            this.disabled = true;
            
            // จำลองการดาวน์โหลด (ในความเป็นจริงคุณจะเรียก API หรือลิงก์ไฟล์จริง)
            setTimeout(() => {
                // สร้างลิงก์ดาวน์โหลดจำลอง
                downloadSchedule(grade, room);
                
                // เปลี่ยนข้อความกลับ
                this.innerHTML = '<i class="download-icon">✅</i> ดาวน์โหลดแล้ว';
                
                // เปลี่ยนกลับเป็นปุ่มปกติหลัง 2 วินาที
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
                
            }, 1500);
        });
    });
    
    // ฟังก์ชันจำลองการดาวน์โหลด
    function downloadSchedule(grade, room) {
        // สร้างข้อมูลตาราง HTML
        const scheduleHTML = generateScheduleHTML(room);
        
        // สร้าง Blob และดาวน์โหลด
        const blob = new Blob([scheduleHTML], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ตารางเรียน_${room.replace(/[\/\(\)]/g, '_')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // แสดง notification
        showNotification(`ดาวน์โหลดตารางเรียน ${room} เรียบร้อยแล้ว`);
    }
    
    
    // ฟังก์ชันแสดง notification
    function showNotification(message) {
        // สร้าง notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // แสดง notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // ซ่อน notification หลัง 3 วินาที
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Smooth scrolling สำหรับ navigation (เหมือนเดิม)
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Facebook API Configuration
const FACEBOOK_CONFIG = {
    pageId: 'your-page-id', // เปลี่ยนเป็น Page ID จริง
    accessToken: 'your-access-token', // เปลี่ยนเป็น Access Token จริง
    apiVersion: 'v18.0'
};

// เริ่มต้นโหลด Facebook API
document.addEventListener('DOMContentLoaded', function() {
    // โหลด Facebook SDK
    loadFacebookSDK();
    
    // โหลดข้อมูลเพจและโพสต์
    loadFacebookData();
    
    // ฟังก์ชันเดิมๆ ที่มีอยู่แล้ว...
});

// โหลด Facebook SDK
function loadFacebookSDK() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: 'your-app-id', // เปลี่ยนเป็น App ID จริง
            cookie: true,
            xfbml: true,
            version: 'v18.0'
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v18.0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

// โหลดข้อมูลจาก Facebook API
async function loadFacebookData() {
    try {
        // จำลองข้อมูล Facebook (สำหรับการทดสอบ)
        const mockData = {
            page: {
                name: "ฝ่ายวิชาการ โรงเรียนยูงทองพิทยาคม",
                category: "หน่วยงานการศึกษา",
                followers_count: 1250,
                fan_count: 1180,
                picture: "https://via.placeholder.com/100x100/1877f2/ffffff?text=YTP"
            },
            posts: [
                {
                    id: "1",
                    message: "📢 ประกาศกำหนดการสอบปลายภาคเรียนที่ 1 ปีการศึกษา 2568\n\n📅 วันที่ 25-29 มิถุนายน 2568\n⏰ เวลา 08:00-11:00 น.\n📍 ห้องเรียนตามปกติ\n\nขอให้นักเรียนทุกคนเตรียมตัวให้พร้อม สู้ๆ! 💪",
                    created_time: "2024-06-18T10:30:00Z",
                    picture: "https://via.placeholder.com/400x200/e3f2fd/1976d2?text=สอบปลายภาค",
                    likes: 85,
                    comments: 12,
                    shares: 23
                },
                {
                    id: "2", 
                    message: "🎉 ขอแสดงความยินดีกับนักเรียนที่ได้รับทุนการศึกษาดีเด่น ประจำปี 2568\n\n🏆 รางวัลความสำเร็จที่เกิดจากความตั้งใจและความพยายาม\n\nรายชื่อผู้ได้รับทุน:\n• ด.ช.สมชาย ใจดี ม.6/1\n• ด.ญ.สุดา เรียนดี ม.6/2\n• ด.ช.วิชัย มานะ ม.5/1",
                    created_time: "2024-06-16T14:15:00Z",
                    likes: 156,
                    comments: 28,
                    shares: 15
                },
                {
                    id: "3",
                    message: "📚 กิจกรรมค่ายวิทยาศาสตร์ประจำปี 2568\n\n🔬 เรียนรู้ผ่านการทดลองจริง\n🧪 สร้างสรรค์นวัตกรรมใหม่\n👨‍🔬 ร่วมกับอาจารย์ผู้เชี่ยวชาญ\n\n📅 25-27 มิถุนายน 2568\n📍 ห้องปฏิบัติการวิทยาศาสตร์\n\n#วิทยาศาสตร์ #นวัตกรรม #การศึกษา",
                    created_time: "2024-06-14T09:45:00Z",
                    picture: "https://via.placeholder.com/400x200/f3e5f5/7b1fa2?text=ค่ายวิทยาศาสตร์",
                    likes: 92,
                    comments: 18,
                    shares: 31
                }
            ]
        };
        
        // อัปเดตข้อมูลเพจ
        updatePageInfo(mockData.page);
        
        // อัปเดตโพสต์
        updatePosts(mockData.posts);
        
    } catch (error) {
        console.error('Error loading Facebook data:', error);
        showError('ไม่สามารถโหลดข้อมูลจาก Facebook ได้ในขณะนี้');
    }
}

// อัปเดตข้อมูลเพจ
function updatePageInfo(pageData) {
    document.getElementById('pageName').textContent = pageData.name;
    document.getElementById('pageCategory').textContent = pageData.category;
    document.getElementById('followersCount').textContent = pageData.followers_count.toLocaleString();
    document.getElementById('likesCount').textContent = pageData.fan_count.toLocaleString();
    
    if (pageData.picture) {
        document.getElementById('pageAvatar').src = pageData.picture;
    }
}

// อัปเดตโพสต์
function updatePosts(postsData) {
    const container = document.getElementById('postsContainer');
    
    if (!postsData || postsData.length === 0) {
        container.innerHTML = '<div class="error">ไม่พบโพสต์ใหม่</div>';
        return;
    }
    
    const postsHTML = postsData.map(post => {
        const timeAgo = getTimeAgo(post.created_time);
        
        return `
            <div class="post-item">
                <div class="post-header">
                    <img src="https://via.placeholder.com/40x40/1877f2/ffffff?text=YTP" alt="Page Avatar" class="post-avatar">
                    <div class="post-info">
                        <h4>ฝ่ายวิชาการ โรงเรียนยูงทองพิทยาคม</h4>
                        <span class="post-time">${timeAgo}</span>
                    </div>
                </div>
                <div class="post-content">${post.message.replace(/\n/g, '<br>')}</div>
                ${post.picture ? `<img src="${post.picture}" alt="Post Image" class="post-image">` : ''}
                <div class="post-stats">
                    <span>👍 ${post.likes} ถูกใจ</span>
                    <span>💬 ${post.comments} ความคิดเห็น</span>
                    <span>📤 ${post.shares} แชร์</span>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = postsHTML;
}

// คำนวณเวลาที่ผ่านมา
function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'เมื่อสักครู่';
    if (diffInHours < 24) return `${diffInHours} ชั่วโมงที่แล้ว`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} วันที่แล้ว`;
    
    return date.toLocaleDateString('th-TH');
}

// แสดงข้อผิดพลาด
function showError(message) {
    const container = document.getElementById('postsContainer');
    container.innerHTML = `<div class="error">${message}</div>`;
}

// สำหรับ Real Facebook API (ใช้เมื่อได้ token จริง)
async function loadRealFacebookData() {
    const baseUrl = `https://graph.facebook.com/v18.0/${FACEBOOK_CONFIG.pageId}`;
    
    try {
        // โหลดข้อมูลเพจ
        const pageResponse = await fetch(`${baseUrl}?fields=name,category,followers_count,fan_count,picture&access_token=${FACEBOOK_CONFIG.accessToken}`);
        const pageData = await pageResponse.json();
        
        // โหลดโพสต์
        const postsResponse = await fetch(`${baseUrl}/posts?fields=id,message,created_time,picture,likes.summary(true),comments.summary(true),shares&limit=5&access_token=${FACEBOOK_CONFIG.accessToken}`);
        const postsData = await postsResponse.json();
        
        updatePageInfo(pageData);
        updatePosts(postsData.data);
        
    } catch (error) {
        console.error('Error loading real Facebook data:', error);
        showError('ไม่สามารถโหลดข้อมูลจาก Facebook ได้');
    }
}
// เพิ่มใน script.js

document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // รับค่าจากฟอร์ม
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // แสดงข้อความกำลังส่ง
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-icon">⏳</span> กำลังส่ง...';
            submitBtn.disabled = true;
            
            // จำลองการส่งข้อมูล (ในการใช้งานจริงให้ส่งไปยัง backend)
            setTimeout(() => {
                // แสดงข้อความสำเร็จ
                submitBtn.innerHTML = '<span class="btn-icon">✅</span> ส่งสำเร็จ!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                
                // แสดง notification
                showNotification('ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด', 'success');
                
                // รีเซ็ตฟอร์ม
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
                
                // ในการใช้งานจริง อาจส่งข้อมูลไปยัง Email หรือ Database
                console.log('Form Data:', formData);
                
            }, 1500);
        });
    }
    
    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // แสดง/ซ่อนปุ่ม scroll to top
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    // คลิกปุ่ม scroll to top
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling สำหรับทุก anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // ข้ามถ้าเป็น # เฉยๆ
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // ลบ 80px สำหรับ navigation bar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // ปิด dropdown menu ในมือถือ (ถ้ามี)
                const dropdown = this.closest('.dropdown-about');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
            }
        });
    });
    
    // Mobile Navigation Toggle
    const navItems = document.querySelectorAll('.nav li');
    navItems.forEach(item => {
        const hasDropdown = item.querySelector('.dropdown-about');
        if (hasDropdown) {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    const dropdown = this.querySelector('.dropdown-about');
                    if (dropdown) {
                        const isVisible = dropdown.style.display === 'block';
                        // ปิด dropdown อื่นๆ ทั้งหมด
                        document.querySelectorAll('.dropdown-about').forEach(d => {
                            d.style.display = 'none';
                        });
                        // เปิด/ปิด dropdown ปัจจุบัน
                        dropdown.style.display = isVisible ? 'none' : 'block';
                        e.preventDefault();
                    }
                }
            });
        }
    });
    
    // ปิด dropdown เมื่อคลิกนอก navigation
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav')) {
            document.querySelectorAll('.dropdown-about').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
    
    // Form Validation
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
    
    // Lazy Loading สำหรับ iframe (Google Maps)
    const mapIframe = document.querySelector('.map-container iframe');
    if (mapIframe && 'IntersectionObserver' in window) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    if (iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                        mapObserver.unobserve(iframe);
                    }
                }
            });
        });
        
        // แปลง src เป็น data-src สำหรับ lazy loading
        if (mapIframe.src) {
            mapIframe.dataset.src = mapIframe.src;
            mapIframe.src = '';
        }
        
        mapObserver.observe(mapIframe);
    }
    

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    

    const animatedElements = document.querySelectorAll('.info-card, .news-card, .grade-card, .post-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        notification.innerHTML = `<span class="notif-icon">${icon}</span> ${message}`;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            max-width: 90%;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        .contact-form input.error,
        .contact-form select.error,
        .contact-form textarea.error {
            border-color: #dc3545;
            animation: shake 0.3s ease;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});