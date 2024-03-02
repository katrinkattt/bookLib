import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { TNavigationParams } from '../store/types'

const useSmartNavigation = () => {
    const navigation = useNavigation<StackNavigationProp<TNavigationParams>>()

    return navigation
}

export default useSmartNavigation
