import React, { useEffect, useState, useContext } from 'react'
import './activities.css'
import Sidenav from '../components/Sidenav'
import { AppContext } from '../context/appContext'
import Navbar from '../components/Navbar'
import { Col, Container, Row, ProgressBar } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'

// Themed Activities page for HabitHorizon
// - left: table of completion timestamps
// - right: progress & streaks card
// This component injects a small scoped stylesheet so you can drop it in without touching global CSS

export default function Activities() {
  const [timeStamps, setTimeStamps] = useState([])
  const { name } = useParams()
  const userDetails = useContext(AppContext)

  useEffect(() => {
    getTimeStamps()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  const getTimeStamps = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/gettimestamps/`, {
        params: { name },
        withCredentials: true,
      })
      if (data.success) {
        setTimeStamps(data.timeStamp.completionTimeStamps || [])
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        console.log(error)
      }
    }
  }

  // Helpers: normalize timestamp -> local date string (YYYY-MM-DD)
  const toLocalDateKey = (t) => {
    const d = new Date(t)
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10)
  }

  // Unique completed days (sorted desc)
  const uniqueDays = React.useMemo(() => {
    const set = new Set()
    timeStamps.forEach((ts) => set.add(toLocalDateKey(ts)))
    return Array.from(set).sort((a, b) => (a < b ? 1 : -1))
  }, [timeStamps])

  // Last 7 days completion percent
  const completionLast7 = React.useMemo(() => {
    const today = new Date()
    let count = 0
    for (let i = 0; i < 7; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      if (uniqueDays.includes(key)) count++
    }
    return Math.round((count / 7) * 100)
  }, [uniqueDays])

  // Current streak: count consecutive days backwards from today
  const currentStreak = React.useMemo(() => {
    const today = new Date()
    let streak = 0
    for (let i = 0; ; i++) {
      const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      if (uniqueDays.includes(key)) streak++
      else break
    }
    return streak
  }, [uniqueDays])

  const formatHuman = (ts) => {
    const d = moment(ts)
    if (d.isSame(moment(), 'day')) return 'Today'
    if (d.isSame(moment().subtract(1, 'day'), 'day')) return 'Yesterday'
    return d.format('DD MMM YYYY')
  }

  return (
    <div className="vh-100 activities-theme">
      {/* Inject small stylesheet scoped to this component so you can drop it in */}
      <style>{`
        
        .activities-card { background: #fff; border-radius: 10px; padding: 18px; box-shadow: 0 6px 18px rgba(0,0,0,0.04); }
        .activities-hero { margin-bottom: 16px; }
        .activities-hero h3 { margin:0; color:#0b5a2b; font-weight:700; }
        .activities-hero p { margin:0; color:#6b6b6b; }
        .activities-table { width:100%; border-collapse:collapse; margin-top:10px; }
        .activities-table th { background:#e9f7ec; color:#0b5a2b; padding:12px; font-weight:600; text-align:center; }
        .activities-table td { padding:12px; text-align:center; border-bottom:1px solid #eee; }
        .activities-table tr:nth-child(even) td { background:#fbfbfb; }
        .badge-day { padding:6px 10px; border-radius:12px; font-weight:600; }
        .badge-today { background:#137f3a; color:white; }
        .badge-yesterday { background:#e6f3ea; color:#137f3a; }
        .progress-card { display:flex; flex-direction:column; gap:12px; align-items:stretch; }
        .metric { display:flex; justify-content:space-between; align-items:center; }
        .metric strong { font-size:18px; color:#0b5a2b; }
        .metric small { color:#6b6b6b }
        .empty-state { text-align:center; color:#9aa09a; padding:30px 0; }
      `}</style>

      <Navbar showlogout={true} />
      <Container fluid>
        <Row className="content-row">
          <Col xs={12} md={3} className="ps-0" id='sidebar'>
            <Sidenav userdetails={userDetails} />
          </Col>

          <Col xs={12} md={9} className='activities'>
            <div className="d-flex gap-3 align-items-center activities-hero">
              <div style={{ flex: 1 }}>
                <h3 className='text-capitalize'>Activities — {decodeURIComponent(name || '')}</h3>
                <p>Track completions and see how your streak and weekly progress look.</p>
              </div>
            </div>

            <div className="d-md-flex gap-3">
              {/* Left: table */}
              <div style={{ flex: 2 }} className="activities-card">
                <h5 style={{ marginBottom: 8 }}>Completion History</h5>
                {timeStamps.length === 0 ? (
                  <div className="empty-state">No completions yet — start the habit and they will appear here.</div>
                ) : (
                  <table className="activities-table">
                    <thead>
                      <tr>
                        <th style={{ width: '10%' }}>#</th>
                        <th>Completed On</th>
                        <th>Exact Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timeStamps.map((ts, idx) => (
                        <tr key={ts + '-' + idx}>
                          <td>{idx + 1}</td>
                          <td>
                            <span className={`badge-day ${moment(ts).isSame(moment(), 'day') ? 'badge-today' : moment(ts).isSame(moment().subtract(1, 'day'), 'day') ? 'badge-yesterday' : ''}`}>
                              {formatHuman(ts)}
                            </span>
                          </td>
                          <td>{moment(ts).format('hh:mm A')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Right: progress & streak */}
              <div style={{ flex: 1 }} className="activities-card">
                <div className="progress-card">
                  <div>
                    <div className="metric"><strong>Current streak</strong><small>{currentStreak} days</small></div>
                    <div style={{ marginTop: 8 }}>
                      <div className="text-muted">Keep your streak going — small wins add up.</div>
                    </div>
                  </div>

                  <div>
                    <div className="metric"><strong>This week</strong><small>{completionLast7}%</small></div>
                    <ProgressBar now={completionLast7} label={`${completionLast7}%`} />
                  </div>

                  <div>
                    <div className="metric"><strong>Total logged days</strong><small>{uniqueDays.length}</small></div>
                  </div>

                  <div style={{ marginTop: 6 }}>
                    <button className="btn btn-outline-success w-100" onClick={getTimeStamps}>Refresh</button>
                  </div>
                </div>
              </div>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  )
}
