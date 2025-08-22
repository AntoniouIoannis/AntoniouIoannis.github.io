// Βεβαιώνεται ότι το DOM έχει φορτώσει πλήρως πριν εκτελεστεί ο κώδικας
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    // Έλεγχος αν η φόρμα εγγραφής υπάρχει στη σελίδα
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            
            event.preventDefault();

            // Παίρνουμε τις τιμές από τα πεδία της φόρμας
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            firebase.database().ref('users/' + username).set({
                username: username,
                email: email,
                password: password // (Μην το κάνετε αυτό σε παραγωγικό περιβάλλον!)
            })
            .then(() => {
                // Ενημερώνουμε τον χρήστη για την επιτυχή εγγραφή
                alert('Η εγγραφή σου ολοκληρώθηκε με επιτυχία!');
                
                registerForm.reset();
            })
            .catch((error) => {
                // Σε περίπτωση σφάλματος, το εμφανίζουμε στην κονσόλα και ενημερώνουμε τον χρήστη
                console.error("Σφάλμα κατά την εγγραφή: ", error);
                alert('Υπήρξε ένα σφάλμα κατά την εγγραφή. Παρακαλώ δοκίμασε ξανά.');
            });
        });
    }

    // Κώδικας για την εναλλαγή μεταξύ login και register
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');

    if(registerLink) {
        registerLink.addEventListener('click', () => {
            wrapper.classList.add('active');
        });
    }

    if(loginLink) {
        loginLink.addEventListener('click', () => {
            wrapper.classList.remove('active');
        });
    }
});
