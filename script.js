document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Command Search Filter
    const cmdSearch = document.getElementById('cmdSearch');
    const cmdCards = document.querySelectorAll('.cmd-card');

    if (cmdSearch) {
        cmdSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            cmdCards.forEach(card => {
                const name = card.querySelector('.cmd-name').textContent.toLowerCase();
                const desc = card.querySelector('.cmd-desc').textContent.toLowerCase();
                const category = card.dataset.category ? card.dataset.category.toLowerCase() : '';

                if (name.includes(query) || desc.includes(query) || category.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // 3. Statistics Dashboard (API Placeholders)
    // Update these values manually or hook them into your backend API endpoint later.
    const initialStats = {
        servers: '12',
        users: '1,420',
        commands: '8,950',
        uptime: '99.9%',
        ping: '24ms'
    };

    function updateStats(data) {
        document.getElementById('stat-servers').textContent = data.servers || '--';
        document.getElementById('stat-users').textContent = data.users || '--';
        document.getElementById('stat-commands').textContent = data.commands || '--';
        document.getElementById('stat-uptime').textContent = data.uptime || '--';
        document.getElementById('stat-ping').textContent = data.ping || '--';
    }

    updateStats(initialStats);

    // 4. Status Panel (API Placeholders)
    const initialStatus = {
        bot: true,
        website: true,
        api: true,
        database: true
    };

    function updateStatus(status) {
        const setServiceStatus = (indicatorId, textId, isOnline) => {
            const indicator = document.getElementById(indicatorId);
            const text = document.getElementById(textId);
            
            if (indicator && text) {
                if (isOnline) {
                    indicator.className = 'status-indicator online';
                    text.textContent = 'Operational';
                } else {
                    indicator.className = 'status-indicator offline';
                    text.textContent = 'Degraded Performance';
                }
            }
        };

        setServiceStatus('status-bot-indicator', 'status-bot-text', status.bot);
        setServiceStatus('status-web-indicator', 'status-web-text', status.website);
        setServiceStatus('status-api-indicator', 'status-api-text', status.api);
        setServiceStatus('status-db-indicator', 'status-db-text', status.database);
    }

    updateStatus(initialStatus);
});
