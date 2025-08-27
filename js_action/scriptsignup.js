// Βεβαιώνεται ότι το DOM έχει φορτώσει πλήρως πριν εκτελεστεί ο κώδικας
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    // ...μέσα στο document.addEventListener('DOMContentLoaded', function () { ...

    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function (event) {
            event.preventDefault(); // Αποτρέπουμε την προεπιλεγμένη συμπεριφορά του link

            const email = prompt("Παρακαλώ εισάγετε το email σας για να σας στείλουμε το link επαναφοράς κωδικού:");

            if (email) {
                firebase.auth().sendPasswordResetEmail(email)
                    .then(() => {
                        alert('📧 Ένα email για την επαναφορά του κωδικού σας έχει σταλεί. Παρακαλώ ελέγξτε τα εισερχόμενά σας.');
                    })
                    .catch((error) => {
                        let errorMessage = "Κάτι πήγε στραβά. Προσπαθήστε ξανά.";
                        if (error.code === 'auth/user-not-found') {
                            errorMessage = "Δεν βρέθηκε χρήστης με αυτό το email.";
                        }
                        console.error("Password Reset Error:", error);
                        alert(`❌ ${errorMessage}`);
                    });
            }
        });
    }
    
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

