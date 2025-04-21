document.querySelectorAll('.site-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `linear-gradient(135deg,rgba(0, 0, 0, 0.33),rgba(81, 0, 255, 0.43) ${x}px, #00000072 ${y}px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'linear-gradient(135deg,rgba(0, 0, 0, 0.33), #00000072)';
    });
});

document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `linear-gradient(135deg,rgba(0, 0, 0, 0.33),rgba(255, 0, 149, 0.43) ${x}px, #00000072 ${y}px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'linear-gradient(135deg,rgba(0, 0, 0, 0.33), #00000072)';
    });
});


document.querySelectorAll('.support-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `linear-gradient(135deg,rgba(0, 0, 0, 0.33),rgba(0, 255, 225, 0.43) ${x}px, #00000072 ${y}px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'linear-gradient(135deg,rgba(0, 0, 0, 0.33), #00000072)';
    });
});







