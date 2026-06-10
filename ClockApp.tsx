import { useState, useEffect, useRef, useCallback } from "react";
// @ts-ignore: CSS module declaration not present
import "./ClockApp.css";
type Mode = "clock" | "stopwatch" | "timer";
type Lap = { id: number; time: number; total: number };

export default function ClockApp() {
  const [mode, setMode] = useState<Mode>("clock");
  const [now, setNow] = useState<Date>(new Date());
  const [elapsed, setElapsed] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  // Timer state
  const [timerInput, setTimerInput] = useState<number>(60);
  const [timerRemaining, setTimerRemaining] = useState<number>(60);

  // Manual time state
  const [isEditingTime, setIsEditingTime] = useState<boolean>(false);
  const [manualBase, setManualBase] = useState<Date | null>(null);
  const [manualBaseTs, setManualBaseTs] = useState<number>(0);
  const [editH, setEditH] = useState<number>(0);
  const [editM, setEditM] = useState<number>(0);
  const [editS, setEditS] = useState<number>(0);

  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    setElapsed(performance.now() - startTimeRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (manualBase) {
        const elapsedMs = Date.now() - manualBaseTs;
        setNow(new Date(manualBase.getTime() + elapsedMs));
      } else {
        setNow(new Date());
      }
    }, 1000);
    return () => clearInterval(id);
  }, [manualBase, manualBaseTs]);

  useEffect(() => {
    if (mode === "stopwatch" && running) {
      startTimeRef.current = performance.now() - elapsed;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, mode, tick]);

  useEffect(() => {
    if (mode === "timer" && running) {
      const id = setInterval(() => {
        setTimerRemaining((r) => {
          if (r <= 1) {
            setRunning(false);
            playBeep();
            return 0;
          }
          return r - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [mode, running]);

  const playBeep = () => {
    try {
      const ctx = new (
        window.AudioContext || (window as any).webkitAudioContext
      )();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
      osc.start();
      osc.stop(ctx.currentTime + 1);
    } catch {}
  };

  const formatHMS = (ms: number): string => {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const cs = Math.floor((ms % 1000) / 10);
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
  };

  const formatClockTime = (d: Date): string =>
    d.toLocaleTimeString("en-GB", { hour12: false });

  const formatClockDate = (d: Date): string =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const startEditTime = () => {
    const d = manualBase || now;
    setEditH(d.getHours());
    setEditM(d.getMinutes());
    setEditS(d.getSeconds());
    setIsEditingTime(true);
  };

  const saveEditTime = () => {
    const h = Math.max(0, Math.min(23, Number(editH) || 0));
    const m = Math.max(0, Math.min(59, Number(editM) || 0));
    const s = Math.max(0, Math.min(59, Number(editS) || 0));
    const d = new Date();
    d.setHours(h, m, s, 0);
    setManualBase(d);
    setManualBaseTs(Date.now());
    setNow(d);
    setIsEditingTime(false);
  };

  const cancelEditTime = () => setIsEditingTime(false);

  const resetToSystemTime = () => {
    setManualBase(null);
    setManualBaseTs(0);
    setNow(new Date());
  };

  const startStopwatch = () => setRunning(true);
  const pauseStopwatch = () => setRunning(false);
  const resetStopwatch = () => {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  };
  const addLap = () => {
    const lastTotal = laps.length > 0 ? laps[laps.length - 1].total : 0;
    setLaps([
      ...laps,
      { id: Date.now(), time: elapsed - lastTotal, total: elapsed },
    ]);
  };

  const startTimer = () => {
    setTimerRemaining(timerInput);
    setRunning(true);
  };
  const resetTimer = () => {
    setRunning(false);
    setTimerRemaining(timerInput);
  };

  const bestLap = laps.length > 0 ? Math.min(...laps.map((l) => l.time)) : 0;
  const worstLap = laps.length > 0 ? Math.max(...laps.map((l) => l.time)) : 0;

  return (
    <div className="app">
      <div className="card">
        <div className="tabs">
          <button
            className={`tab ${mode === "clock" ? "active" : ""}`}
            onClick={() => setMode("clock")}
          >
            <span className="tab-icon">🕐</span>
            <span>Clock</span>
          </button>
          <button
            className={`tab ${mode === "stopwatch" ? "active" : ""}`}
            onClick={() => setMode("stopwatch")}
          >
            <span className="tab-icon">⏱</span>
            <span>Stopwatch</span>
          </button>
          <button
            className={`tab ${mode === "timer" ? "active" : ""}`}
            onClick={() => setMode("timer")}
          >
            <span className="tab-icon">⏰</span>
            <span>Timer</span>
          </button>
        </div>

        {mode === "clock" && (
          <div className="mode-view">
            <div className="clock-header">
              <div className="clock-date">{formatClockDate(now)}</div>
              {!isEditingTime && (
                <button
                  className="edit-time-btn"
                  onClick={startEditTime}
                  title="ویرایش ساعت"
                >
                  ✏️
                </button>
              )}
            </div>

            {isEditingTime ? (
              <div className="time-edit">
                <div className="time-edit-fields">
                  <input
                    type="number"
                    min={0}
                    max={23}
                    value={editH}
                    onChange={(e) =>
                      setEditH(
                        Math.max(0, Math.min(23, Number(e.target.value) || 0)),
                      )
                    }
                  />
                  <span className="time-sep">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={editM}
                    onChange={(e) =>
                      setEditM(
                        Math.max(0, Math.min(59, Number(e.target.value) || 0)),
                      )
                    }
                  />
                  <span className="time-sep">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={editS}
                    onChange={(e) =>
                      setEditS(
                        Math.max(0, Math.min(59, Number(e.target.value) || 0)),
                      )
                    }
                  />
                </div>
                <div className="edit-actions">
                  <button className="btn primary" onClick={saveEditTime}>
                    ✓ ذخیره
                  </button>
                  <button className="btn secondary" onClick={cancelEditTime}>
                    ✕ لغو
                  </button>
                </div>
              </div>
            ) : (
              <div className="clock-time">{formatClockTime(now)}</div>
            )}

            {manualBase && !isEditingTime && (
              <button
                className="reset-time-btn"
                onClick={resetToSystemTime}
                title="بازگشت به ساعت سیستم"
              >
                ↻ بازگشت به ساعت سیستم
              </button>
            )}

            <div className="clock-glow" />
          </div>
        )}

        {mode === "stopwatch" && (
          <div className="mode-view">
            <div className="big-time">{formatHMS(elapsed)}</div>
            <div className="controls">
              {!running ? (
                <button className="btn primary" onClick={startStopwatch}>
                  ▶ Start
                </button>
              ) : (
                <button className="btn warning" onClick={pauseStopwatch}>
                  ⏸ Pause
                </button>
              )}
              <button
                className="btn secondary"
                onClick={addLap}
                disabled={!running && elapsed === 0}
              >
                🏁 Lap
              </button>
              <button className="btn danger" onClick={resetStopwatch}>
                ↺ Reset
              </button>
            </div>

            {laps.length > 0 && (
              <div className="laps">
                <div className="laps-header">
                  <span>Lap</span>
                  <span>Lap Time</span>
                  <span>Total</span>
                </div>
                {[...laps].reverse().map((lap, idx) => {
                  const realIdx = laps.length - idx;
                  const isBest = lap.time === bestLap && laps.length > 1;
                  const isWorst = lap.time === worstLap && laps.length > 1;
                  return (
                    <div
                      key={lap.id}
                      className={`lap-row ${isBest ? "best" : ""} ${isWorst ? "worst" : ""}`}
                    >
                      <span className="lap-num">#{realIdx}</span>
                      <span className="mono">{formatHMS(lap.time)}</span>
                      <span className="mono dim">{formatHMS(lap.total)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {mode === "timer" && (
          <div className="mode-view">
            <div
              className={`big-time ${timerRemaining === 0 ? "done" : ""} ${
                running && timerRemaining < 10 ? "urgent" : ""
              }`}
            >
              {formatHMS(timerRemaining * 1000)}
            </div>

            {!running && (
              <div className="timer-input-row">
                <label>Minutes:</label>
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={timerInput}
                  onChange={(e) => {
                    const v = Math.max(
                      1,
                      Math.min(999, Number(e.target.value) || 1),
                    );
                    setTimerInput(v);
                    setTimerRemaining(v);
                  }}
                />
              </div>
            )}

            <div className="controls">
              {!running ? (
                <button
                  className="btn primary"
                  onClick={startTimer}
                  disabled={timerRemaining === 0}
                >
                  ▶ Start
                </button>
              ) : (
                <button
                  className="btn warning"
                  onClick={() => setRunning(false)}
                >
                  ⏸ Pause
                </button>
              )}
              <button className="btn danger" onClick={resetTimer}>
                ↺ Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
