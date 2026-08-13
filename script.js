document.addEventListener('DOMContentLoaded', () => {

    // 1. Live Date Display
    const dateDisplay = document.getElementById('currentDate');
    if (dateDisplay) {
        const today = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        dateDisplay.textContent = today.toLocaleDateString('en-US', options);
    }

    // 2. Global Search Filtering
    const searchInput = document.getElementById('globalSearch');
    const cmdItems = document.querySelectorAll('.cmd-item');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            cmdItems.forEach(item => {
                const text = item.getAttribute('data-search').toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // 3. Statistics Dashboard Integration Placeholders
    const metricsData = {
        servers: '12',
        users: '1,420',
        commands: '8,950',
        uptime: '99.9%'
    };

    function populateMetrics(data) {
        const serversElem = document.getElementById('stat-servers');
        const usersElem = document.getElementById('stat-users');
        const commandsElem = document.getElementById('stat-commands');
        const uptimeElem = document.getElementById('stat-uptime');

        if (serversElem) serversElem.textContent = data.servers;
        if (usersElem) usersElem.textContent = data.users;
        if (commandsElem) commandsElem.textContent = data.commands;
        if (uptimeElem) uptimeElem.textContent = data.uptime;
    }

    populateMetrics(metricsData);

    // 4. Smooth Scrolling for Sidebar Icons
    const navItems = document.querySelectorAll('.nav-item[href^="#"]');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const targetId = item.getAttribute('href');
            const targetElem = document.querySelector(targetId);
            
            if (targetElem) {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                targetElem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
