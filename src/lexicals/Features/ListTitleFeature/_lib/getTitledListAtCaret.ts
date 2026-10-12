import { $isTitledListNode, TitledListNode } from '@/lexicals/Features/ListTitleFeature'
import { $getAtCaret } from '@/lexicals/Features/_lib/getAtCaret'

export const $getTitledListAtCaret = () => $getAtCaret<TitledListNode>($isTitledListNode)
