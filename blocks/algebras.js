/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Algebra blocks for Blockly.
 * @author jonathan@b-studios.de (Jonathan Brachthäuser)
 */
'use strict';

goog.provide('Blockly.Blocks.algebras');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.algebras.HUE = 120;
Blockly.Blocks.algebras.TERMS_HUE = 140;

Blockly.Blocks['algebras_folddef_numeral'] = {

  succArgField_: null,

  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {

    var nameField = new Blockly.FieldTextInput("my", Blockly.Procedures.rename);
    nameField.setSpellcheck(false);

    this.succArgField_ = new Blockly.FieldTextInput("x", this.renameParam);
    this.succArgField_.setSpellcheck(false);

    this.setColour(Blockly.Blocks.algebras.HUE);

    this.appendDummyInput()
        .appendField(nameField, 'NAME')
        .appendField("algebra");
    this.appendValueInput('ZERO')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("zero");
    this.appendValueInput('SUCC')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("succ")
        .appendField(this.succArgField_, 'ARG');
  },

  // will be executed in the context of the textfield
  renameParam: function (newName) {
    return newName;
  },

  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.succArgField_.text_)) {
      this.succArgField_.setValue(newName);
    }
  },

  // Algebras define functions
  getProcedureDef: function () {
    return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  arguments_: ["numeral"],

  getVars: function() { return [this.succArgField_.text_]; }
};


Blockly.Blocks['algebras_zero'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "Zero",
      "output": "Number",
      "colour": Blockly.Blocks.algebras.TERMS_HUE
    });
  }
};

Blockly.Blocks['algebras_succ'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "Succ %1",
      "args0": [
        {
          "type": "input_value",
          "name": "PRED"
        },
      ],
      "output": "Number",
      "colour": Blockly.Blocks.algebras.TERMS_HUE
    });
  }
};

