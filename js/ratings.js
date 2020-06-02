// Initial Ratings
const ratings = {
    claire: 4.7,
    harry: 3.4,
    james: 2.3,
    josh: 3.6,
    taylor: 4.1
  }

  // Total Stars
  const starsTotal = 5;

  // Run getRatings when DOM loads
  document.addEventListener('DOMContentLoaded', getRatings);

  // Form Elements
  const doctorSelect = document.getElementById('doctor-select');
  const ratingControl = document.getElementById('rating-control');

  // Init doctor
  let doctor;

  // Doctor select change
  doctorSelect.addEventListener('change', (e) => {
    doctor = e.target.value;
    // Enable rating control
    ratingControl.disabled = false;
    ratingControl.value = ratings[doctor];
  });

  // Rating control change
  ratingControl.addEventListener('blur', (e) => {
    const rating = e.target.value;

    // Make sure 5 or under
    if (rating > 5) {
      alert('Please rate 1 - 5');
      return;
    }

    // Change rating
    ratings[doctor] = rating;

    getRatings();
  });

  // Get ratings
  function getRatings() {
    for (let rating in ratings) {
      // Get percentage
      const starPercentage = (ratings[rating] / starsTotal) * 100;

      // Round to nearest 10
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

      // Set width of stars-inner to percentage
      document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

      // Add number rating
      document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
    }
  }