/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating JavaScript for algebras blocks.
 * @author jonathan@b-studios.de (Jonathan Brachthäuser)
 */
'use strict';

goog.provide('Blockly.JavaScript.algebras');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['algebras_zero'] = function(block) {
  return [
    "(function (z, s) { return z; })",
    Blockly.JavaScript.ORDER_FUNCTION_CALL];
}

Blockly.JavaScript['algebras_succ'] = function(block) {

  var pred = Blockly.JavaScript.valueToCode(block, 'PRED', Blockly.JavaScript.ORDER_NONE);

  var code = [
      "(function (z, s) {",
         "return s(", pred, "(z, s))",
      "})"
    ].join("")

  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}

Blockly.JavaScript['algebras_folddef_numeral'] = function(block) {

  var funcName = Blockly.JavaScript.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE)

  function makeName(name) {
    return Blockly.JavaScript.variableDB_.getName(
      name,
      Blockly.Variables.NAME_TYPE)
  }

  function generate(child) {
    return Blockly.JavaScript.valueToCode(block, child, Blockly.JavaScript.ORDER_ATOMIC);
  }

  var succArgName = makeName(block.succArgField_.text_),
      succFunName = makeName("succ"),
      numeralName = makeName("num"),
      resultName = makeName("res"),
      indexName = makeName("i");

  var zero = generate('ZERO'),
      succBody = generate('SUCC');

  var succFun = [
    "function ",succFunName," (", succArgName, ") {", "return ", succBody, "; }"
  ].join('')

  // If `num` is not a numeral (function) we expect it to be an actual number.
  var code = [
    "function ", funcName, "(", numeralName, ") {\n",
      succFun, "\n",

      "if (typeof ", numeralName, " === 'function') {",
      "  return ", numeralName, "(", zero, ", ", succFunName, ");\n",
      "} else {\n",
        "var ", resultName, "=", zero, ";\n",
        "for (var ", indexName, "=", numeralName, ";", indexName, "> 0;", indexName, "--){\n",
          resultName, "=", succFunName, "(", resultName, ");\n",
        "}\n",
        "return ", resultName, ";\n",
      "}\n",
    "}\n"
  ].join('')

  code = Blockly.JavaScript.scrub_(block, code);
  Blockly.JavaScript.definitions_['%' + funcName] = code;

  return null;
}

