export const getTherapists = (req, res) => {
  const therapists = [
  {
    "name": "Dr. Neha Verma",
    "specialty": "Cognitive Behavioral Therapy (CBT), Stress Management",
    "experience": 12,
    "availability": "Mon-Fri | 10am - 6pm",
    "languages": "English, Hindi",
    "qualifications": "PhD Clinical Psychology, NIMHANS",
    "bio": "Over 12 years helping individuals cope with anxiety, work stress, and trauma. Empathetic, goal-oriented approach.",
    "image": "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    "name": "Dr. Arjun Mehta",
    "specialty": "Anxiety, Burnout Recovery",
    "experience": 9,
    "availability": "Tue-Sat | 11am - 7pm",
    "languages": "English",
    "qualifications": "M.Phil Clinical Psychology, AIIMS Delhi",
    "bio": "Known for helping working professionals manage burnout, self-esteem issues, and lifestyle balance.",
    "image": "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    "name": "Dr. Priya Iyer",
    "specialty": "Adolescent Therapy, Depression",
    "experience": 8,
    "availability": "Mon-Fri | 9am - 4pm",
    "languages": "English, Tamil",
    "qualifications": "MA Psychology, University of Mumbai",
    "bio": "Expert in working with teenagers and young adults to overcome self-doubt and emotional challenges.",
    "image": "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    "name": "Dr. Sameer Khan",
    "specialty": "Relationship Counseling, Emotional Intelligence",
    "experience": 10,
    "availability": "Wed-Sun | 1pm - 9pm",
    "languages": "English, Urdu",
    "qualifications": "PhD in Counseling Psychology, Jamia Millia Islamia",
    "bio": "Helps individuals and couples improve communication and build healthier emotional bonds.",
    "image": "https://randomuser.me/api/portraits/men/40.jpg"
  }
]

  res.status(200).json(therapists);
};
