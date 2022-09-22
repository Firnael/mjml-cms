import beautifyJS from 'js-beautify';
import React, { useEffect, useRef } from 'react';
import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/core/dist';
import { codeMirrorCtrlD, codeMirrorDuplicate } from './lib/shortcuts';
import { completeAfter, completeIfAfterLt, completeIfInTag } from './lib/autocomplete';
import CodeMirror, { Editor, EditorConfiguration, EditorFromTextArea, HighlightSelectionMatches } from 'codemirror';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/lint/lint';
/* styles*/
import './file-editor.css';
import './one-dark.css';

let codeMirror: EditorFromTextArea | any = null;

function FileEditor(props: any) {
    let _textarea: any = useRef();

    useEffect(() => {
        if (!codeMirror) {
            initEditor();
        }
        setContent(props.content);
    }, [props.content]);

    const handleCtrlShiftD = (cm: any) => {
        codeMirrorDuplicate(cm, codeMirror);
    };

    const handleCtrlD = (cm: any) => {
        codeMirrorCtrlD(cm, codeMirror);
    };

    const initEditor = () => {
        if (!_textarea) {
            return;
        }

        if (codeMirror) {
            codeMirror.toTextArea();
            codeMirror = null;
        }

        const highlightSelectionMatchesOptions: HighlightSelectionMatches = {
            wordsOnly: true,
            delay: 100
        };

        const editorConfig: EditorConfiguration = {
            tabSize: 2,
            dragDrop: false,
            matchTags: { bothTags: true },
            indentUnit: 2,
            indentWithTabs: false,
            mode: 'xml',
            lineNumbers: true,
            theme: 'one-dark',
            autoCloseTags: true,
            highlightSelectionMatches: highlightSelectionMatchesOptions,
            foldGutter: true,
            styleActiveLine: { nonEmpty: true },
            gutters: [
                'CodeMirror-lint-markers',
                'CodeMirror-linenumbers',
                'CodeMirror-foldgutter'
            ],
            lineWrapping: true,
            extraKeys: {
                '\'<\'': (cm: Editor) => completeAfter(CodeMirror, cm, null),
                '\'/\'': (cm: Editor) => completeIfAfterLt(CodeMirror, cm),
                '\' \'': (cm: Editor) => completeIfInTag(CodeMirror, cm),
                '\'=\'': (cm: Editor) => completeIfInTag(CodeMirror, cm),
                'Ctrl-Space': 'autocomplete',
                'Ctrl-D': (cm: Editor) => handleCtrlD(cm),
                'Cmd-D': (cm: Editor) => handleCtrlD(cm),
                'Shift-Ctrl-D': (cm: Editor) => handleCtrlShiftD(cm),
                'Shift-Cmd-D': (cm: Editor) => handleCtrlShiftD(cm)
            }
        }

        codeMirror = CodeMirror.fromTextArea(_textarea, editorConfig);
    };

    const beautify = (content: string): string => {
        return beautifyJS.html(content, {
            indent_size: 2,
            wrap_attributes_indent_size: 2,
            preserve_newlines: false
        });
    };

    const setContent = (content: string) => {
        const scrollInfo = codeMirror.getScrollInfo();

        codeMirror.setValue(content);
        codeMirror.scrollTo(0, scrollInfo.top);
    };

    return (
        <>
            <Flex flexDirection={'row'} marginX={2} marginY={2} alignItems={'center'}>
                <Text
                    display={'flex'}
                    flex={1}
                    fontSize={'xs'}
                    justifyContent={'flex-start'}
                    color={'#fff'}>
                    MJML Editor
                </Text>
                <ButtonGroup
                    spacing={2}
                    flex={1}
                    display={'flex'}
                    justifyContent={'flex-end'}>
                    <Button
                        cursor={'pointer'}
                        boxShadow={'none'}
                        color={'#ffffff'}
                        _hover={{ background: 'transparent', borderColor: '#3470df', color: '#3470df' }}
                        size='xs'
                        variant='outline'
                        variantColor='teal'
                        onClick={() => {
                            if (!codeMirror) {
                                return;
                            }
                            codeMirror.setValue(beautify(codeMirror.getValue()));
                        }}>
                        Beautify
                    </Button>
                    <Button
                        cursor={'pointer'}
                        boxShadow={'none'}
                        color={'#ffffff'}
                        _hover={{ background: 'transparent', borderColor: '#3470df', color: '#3470df' }}
                        size='xs'
                        variant='outline'
                        variantColor='teal'
                        onClick={() => {
                            if (!codeMirror) {
                                return;
                            }
                            props.mjml(codeMirror.getValue());
                        }}>
                        Preview
                    </Button>
                </ButtonGroup>
            </Flex>
            <Box className={'FileEditor'}>
                <textarea ref={r => (_textarea = r)} />
            </Box>
        </>
    );
}

export default FileEditor;
