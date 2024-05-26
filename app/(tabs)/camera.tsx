import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export default function App() {
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [permission, setPermission] = useState<boolean | null>(null);
  const [isModelReady, setModelReady] = useState<boolean>(false);
  const [classificationResult, setClassificationResult] = useState<tf.Tensor | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const model = useRef<tf.GraphModel | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');
      await tf.ready();
      model.current = await tf.loadGraphModel('file:///path/to/your/model.json');
      setModelReady(true);
    })();
  }, []);

  if (permission === null) {
    return <View />;
  }

  if (permission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={() => Camera.requestCameraPermissionsAsync()} title="Grant Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  async function takePictureAndClassify() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      const image = new Image();
      image.src = 'data:image/jpg;base64,' + photo.base64;

      image.onload = async () => {
        const imageTensor = tf.browser.fromPixels(image);
        const predictions = model.current?.predict(imageTensor.expandDims(0));
        setClassificationResult(predictions as tf.Tensor);
      };
    }
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          {isModelReady && (
            <TouchableOpacity style={styles.button} onPress={takePictureAndClassify}>
              <Text style={styles.text}>Classify Image</Text>
            </TouchableOpacity>
          )}
        </View>
      </Camera>
      {classificationResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{JSON.stringify(classificationResult.arraySync(), null, 2)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: 'black',
  },
});
