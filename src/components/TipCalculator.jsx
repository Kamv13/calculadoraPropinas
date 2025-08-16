import React, { useState } from 'react'
import Swal from 'sweetalert2'
import TipInput from './TipInput'

function TipCalculator() {
  const [total, setTotal] = useState('')
  const [tips, setTips] = useState({ '10': '', '15': '', '20': '' })
  const [selected, setSelected] = useState(null)

  const TotalChange = (e) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) setTotal(value)
  }

  const calculateTips = (percent = null) => {
    if (!total || Number(total) <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El total no puede estar vacío o ser menor que cero.',
      })
      return
    }
    const base = parseFloat(total)
    const newTips = { ...tips }
    ;['10', '15', '20'].forEach((p) => {
      if (!percent || percent === Number(p)) {
        newTips[p] = (base * (Number(p) / 100)).toFixed(2)
      }
    })
    setTips(newTips)
    if (percent) setSelected(percent)
    else setSelected(null)
  }

  const handleClear = () => {
    setTotal('')
    setTips({ '10': '', '15': '', '20': '' })
    setSelected(null)
  }

  return (
    <div className="container mt-5">
      <div className="card mx-auto shadow" style={{ maxWidth: 400 }}>
        <div className="card-body">
          <h3 className="card-title mb-4">Calculadora de Propinas</h3>
          <div className="mb-3">
            <label className="form-label">Total</label>
            <input
              type="number"
              className="form-control"
              value={total}
              min="0"
              onChange={TotalChange}
              placeholder="Ingresa el total"
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <button
              className={`btn btn-outline-primary ${selected === 10 ? 'active' : ''}`}
              onClick={() => calculateTips(10)}
              type="button"
            >
              10%
            </button>
            <button
              className={`btn btn-outline-primary ${selected === 15 ? 'active' : ''}`}
              onClick={() => calculateTips(15)}
              type="button"
            >
              15%
            </button>
            <button
              className={`btn btn-outline-primary ${selected === 20 ? 'active' : ''}`}
              onClick={() => calculateTips(20)}
              type="button"
            >
              20%
            </button>
          </div>
          <TipInput label="Propina 10%" value={tips['10']} />
          <TipInput label="Propina 15%" value={tips['15']} />
          <TipInput label="Propina 20%" value={tips['20']} />
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-success" onClick={() => calculateTips()} type="button">
              Calcular
            </button>
            <button className="btn btn-secondary" onClick={handleClear} type="button">
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TipCalculator