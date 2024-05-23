import React, { useState, useEffect } from 'react';

const CareerList = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/career')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setCareers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Career Opportunities</h1>
      <ul>
        {careers.map(career => (
          <li key={career._id}>
            <h2>{career.jobTitle}</h2>
            <p>{career.companyName}</p>
            <p>{career.jobLocation}</p>
            <p>{career.jobType}</p>
            <p>{career.jobCategory}</p>
            <p>{career.jobDescription}</p>
            <p>Skills: {career.skills.join(', ')}</p>
            <p>Experience: {career.experience}</p>
            <p>Education: {career.education}</p>
            <p>Salary: ${career.salary}</p>
            <p>Application Deadline: {new Date(career.applicationDeadline).toLocaleDateString()}</p>
            <p>Contact Person: {career.contactPerson}</p>
            <p>Contact Mobile: {career.contactMobile}</p>
            <a href={career.applicationUrl} target="_blank" rel="noopener noreferrer">Apply Here</a>
            {career.careerImage && (
              <div>
                <img 
                  src={career.careerImage} 
                  alt="Career"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CareerList;
