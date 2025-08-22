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

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
            // Ο χρήστης δημιουργήθηκε με επιτυχία!
            const user = userCredential.user;
            console.log('User created:', user);

            user.sendEmailVerification().then(() => {
                alert('✅ Η εγγραφή ολοκληρώθηκε! \nΈνα email επαλήθευσης έχει σταλεί στη διεύθυνσή σου. \nΠαρακαλώ έλεγξε τα εισερχόμενά σου.');
            });
            
            firebase.database().ref('users/' + user.uid).set({
                username: username,
                email: email
            });

            registerForm.reset();
            })
            .catch((error) => {
                let errorMessage = "Υπήρξε ένα σφάλμα κατά την εγγραφή.";
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "Αυτό το email χρησιμοποιείται ήδη από άλλον χρήστη.";
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = "Ο κωδικός πρόσβασης είναι πολύ αδύναμος. Πρέπει να είναι τουλάχιστον 7 χαρακτήρες.";
                }
                console.error("Registration Error:", error);
                alert(`❌ ${errorMessage}`);
            });
            
        });
    }

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

