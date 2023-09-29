import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "../app/app-reducer";

let startState: InitialStateType

beforeEach( () => {
    startState = {
        status: 'idle',
        error: null as string | null
    }
})

test('when requested, processes the current status', () => {
    const endState = setStatusAC('loading')
    const endState2 = appReducer(startState, setStatusAC('succeeded'))

    expect(endState.status).toBe('loading')
    expect(endState2.status).toBe('succeeded')
})

test('when requested, handles the current error', () => {
    const endState = appReducer(startState, setErrorAC('error message'))
    const endState2 = appReducer(startState, setErrorAC(null))

    expect(endState.error).toBe('error message')
    expect(endState2.error).toBe(null)
})