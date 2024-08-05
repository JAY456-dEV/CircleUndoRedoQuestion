import React, { useEffect, useRef, useState } from 'react'

function CircleColor() {
    const COLORS = [
        '#2c3e50',
        '#34495e',
        '#c0392b',
        '#e74c3c',
        '#27ae60',
        '#3498db',
        '#f39c12',
        '#f1c40f',
    ];

    const undoRef = useRef()
    const reduRef = useRef()
    const resetRef = useRef()

    const [randomColorStore, setRandomColorStore] = useState([])

    const [locationMouse, setLoctionMouse] = useState([])

    function handleRandomColor() {
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        setRandomColorStore(prev => [...prev, randomColor])
    }

    console.log(randomColorStore)

    useEffect(() => {
        window.addEventListener('click', function (e) {
            if (undoRef.current == e.target || reduRef.current == e.target || resetRef.current == e.target) {
                return
            }

            setLoctionMouse(prev => [...prev, { top: e.clientY, left: e.clientX }])
            handleRandomColor()
        })
    }, [])

    const [undoValue, setUndoValue] = useState([])

    function handleUndo() {
        if (randomColorStore.length > 0) {
            const copyColorStore = [...randomColorStore]
            let show = copyColorStore.pop()
            console.log(copyColorStore)
            setUndoValue(prev => [...prev, show])
            setRandomColorStore(copyColorStore)
        }
    }

    function handleRedo() {
        if (undoValue.length > 0) {
            const copyUndoValue = [...undoValue]
            let showDeletefromEnd = copyUndoValue.pop()
            setUndoValue(copyUndoValue)
            setRandomColorStore(prev => [...prev, showDeletefromEnd])
        }
    }

    function handleReset() {
        if (randomColorStore.length > 0) {
            setRandomColorStore([])
            setLoctionMouse([])
        }
    }

    return (
        <div>
            <div>
                <button onClick={handleUndo} ref={undoRef}>Undo</button>
                <button onClick={handleRedo} ref={reduRef}>Redo</button>
                <button onClick={handleReset} ref={resetRef}>Reset</button>
            </div>
            {
                randomColorStore && randomColorStore.map((color, idx) => {
                    return <div key={idx} className='makeRounded' style={{
                        backgroundColor: color,
                        position: "absolute",
                        top: (locationMouse[idx].top),
                        left: (locationMouse[idx].left)
                    }}>
                    </div>
                })
            }
        </div>
    )
}

export default CircleColor