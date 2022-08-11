
import { useEffect, useState } from 'react';
import {FaAngleDoubleRight} from 'react-icons/fa';
import './App.css'
import { url } from './utils/url';
import { IJob } from './interfaces/job';

function App() {

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [value, setValue] = useState(0);

  const fetchJobs = async() => {
    const response = await fetch(url);
    const data = await response.json();

    setJobs(data);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchJobs();  
  }, []);
  
  if(loading){
    return (
      <section className='section loading'>
        <h1>Loading...</h1>
      </section>
    )
  };

  const {company, title, duties, dates} = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"/>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {
            jobs.map( (job,index)=> (
              <button
                className={`job-btn ${index === value && 'active-btn'}`}
                key={index}
                onClick={() => setValue(index)}
              >{job.company}</button>
            ) )
          }
        </div>
        {/* job info */}
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {
            duties.map( (duty, index) => (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className='job-icon'/>
                <p>{duty}</p>
              </div>
            ))
          }
        </article>
      </div>

    </section>
  )
}

export default App
