/**
  * @author Chris Pynegar
  *
  * Simple wysiwyg editor built with jQuery, styled with Twitter Bootstrap
*/

$.fn.wysiwyg = function(options) {
    
    var container;
    var editor;
    var editorBody;
    var toolbar;
    var $this;
    
    // set default options
    var settings = $.extend({
        width: '400px',
        height: '200px',
        btnGroupClass: 'btn-group',
        btnClass: 'btn'
    }, options);
    
    // core wysiwyg methods
    var wysiwyg = {
        container: function() {
            var containerDiv = $('<div/>', {
                css: {
                    width: settings.width,
                    height: settings.height,
                    border: '1px solid #CCC'
                }
            });
            
            return containerDiv;
        },
        iframe: function(container) {
            var iframe = $('<iframe/>', {
                frameborder: '0',
                css: {
                    width: settings.width,
                    height: settings.height
                }
            }).appendTo(container).get(0);
            
            return iframe;
        },
        toolbar: function() {
            var toolbarDiv = $('<div/>', {
                'class': 'btn-toolbar',
                css: {
                    width: settings.width,
                    height: '20px',
                    'margin-bottom': '12px',
                    'margin-top': '0px'
                }
            });

            return toolbarDiv;
        },
        execCommand: function(e) {
            $(this).toggleClass('selected');
            var contentWindow = editor.contentWindow;
            contentWindow.focus();
            contentWindow.document.execCommand($(this).data('commandName'), false, '');
            contentWindow.focus();

            $this.val(editorBody.context.body.innerHTML);

            return false;
        }
    }
    
    // buttons
    var button = {
        format: {
            bold: function(i) {
                var btnFormatBold = $('<button/>', {
                    'class': settings.btnClass,
                    data: {
                        commandName: 'bold'
                    },
                    click: wysiwyg.execCommand
                }).appendTo(i);

                var btnFormatBoldIcon = $('<i/>', {
                    'class': 'icon-bold'
                }).appendTo(btnFormatBold);
            },
            italic: function(i) {
                var btnFormatItalic = $('<button/>', {
                    'class': settings.btnClass,
                    data: {
                        commandName: 'italic'
                    },
                    click: wysiwyg.execCommand
                }).appendTo(i);

                var btnFormatItalicIcon = $('<i/>', {
                    'class': 'icon-italic'
                }).appendTo(btnFormatItalic);
            },
            underline: function(i) {
                var btnFormatUnderline = $('<button/>', {
                    'class': settings.btnClass,
                    data: {
                        commandName: 'underline'
                    },
                    text: 'U',
                    css: {
                        'text-decoration': 'underline'
                    },
                    click: wysiwyg.execCommand
                }).appendTo(i);
            }
        },
        history: {
            undo: function(i) {
                var btnHistoryUndo = $('<button/>', {
                    text: 'Undo',
                    'class': settings.btnClass,
                    data: {
                        commandName: 'undo'
                    },
                    click: wysiwyg.execCommand
                }).appendTo(i);
            },
            redo: function(i) {
                var btnHistoryUndo = $('<button/>', {
                    text: 'Redo',
                    'class': settings.btnClass,
                    data: {
                        commandName: 'redo'
                    },
                    click: wysiwyg.execCommand
                }).appendTo(i);
            }
        },
        justify: {
            left: function(i) {
                var btnJustifyLeft = $('<button/>', {
                    'class': settings.btnClass,
                    data: {
                        commandName: 'justifyleft'
                    },
                    click: wysiwyg.execCommand
                }).appendTo(i);

                var btnJustifyLeftIcon = $('<i/>', {
                    'class': 'icon-align-left'
                }).appendTo(btnJustifyLeft);
            },
            center: function(i) {
                var btnJustifyCenter = $('<button/>', {
                    'class': settings.btnClass,
                    data: {
                        commandName: 'justifycenter'
                    },
                    click: wysiwyg.execCommand
                }).appendTo(i);

                var btnJustifyCenterIcon = $('<i/>', {
                    'class': 'icon-align-center'
                }).appendTo(btnJustifyCenter);
            },
            right: function(i) {
                var btnJustifyRight = $('<button/>', {
                    'class': settings.btnClass,
                    data: {
                        commandName: 'justifyright'
                    },
                    click: wysiwyg.execCommand
                }).appendTo(i);

                var btnJustifyRightIcon = $('<i/>', {
                    'class': 'icon-align-right'
                }).appendTo(btnJustifyRight);
            }
        }
    };
    
    return this.each(function() {
       $this = $(this).hide();
       
       container = wysiwyg.container();
       $this.after(container);
       
       editor = wysiwyg.iframe(container);
        
       editor.contentWindow.document.open();
       editor.contentWindow.document.close();
       editor.contentWindow.document.designMode="on";
       
       editorBody = $(editor.contentWindow.document).find('body');
       editorBody.append($this.val());
       
       $(editorBody).live('keyup', function(e) {
           $this.val(editorBody.context.body.innerHTML);
       });

       // setup toolbar
       
       toolbar = wysiwyg.toolbar();
       
       $this.before(toolbar);
       
       var formatBtnGroup = $('<div/>', {
          'class': settings.btnGroupClass 
       }).appendTo(toolbar);

       button.format.bold(formatBtnGroup);
       button.format.italic(formatBtnGroup);
       button.format.underline(formatBtnGroup);
       
       var historyBtnGroup = $('<div/>', {
          'class': settings.btnGroupClass 
       }).appendTo(toolbar);
       
       button.history.undo(historyBtnGroup);
       button.history.redo(historyBtnGroup);
       
       var justifyBtnGroup = $('<div/>', {
          'class': settings.btnGroupClass 
       }).appendTo(toolbar);
       
       button.justify.left(justifyBtnGroup);
       button.justify.center(justifyBtnGroup);
       button.justify.right(justifyBtnGroup);
    });
    
}