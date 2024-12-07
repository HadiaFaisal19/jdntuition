import axios from 'axios';

export const getBarkReviews = async () => {
  // Replace this with an actual API call if Bark provides one
  try {
    const response = await axios.get('https://www.bark.com/en/au/b/jdn-tuition/ME0ew/');
    return response.data; // Ensure it matches the Bark API's response structure
  } catch (error) {
    console.error('Error fetching Bark reviews:', error);
    return []; // Return an empty array if an error occurs
  }
};
