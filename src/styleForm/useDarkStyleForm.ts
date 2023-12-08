export const useDarkStyleForm = () => {
    const styles = {
        backgroundColor: 'transparent',
        borderColor: 'white',
    };

    const InputLabelProps = {
        style: { color: 'lightGrey' },
    }

    const InputProps = {
        style: {
            backgroundColor: styles.backgroundColor,
            '&:not(:focus)': {
                borderColor: styles.borderColor,
            },
        },
    };

    return {
        InputLabelProps,
        InputProps
    }
}